import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

import { UploadTrackDto } from '@features/library/interfaces/library-api.model';
import { MAX_FILE_SIZE_MB, TRACK_UPLOAD_LIMITS } from '@features/library/interfaces/track-upload-limits';
import { getAudioDuration } from '@shared/utils/get-audio-duration';
import { TuiButton, TuiError, TuiLabel, TuiLink, TuiTextfield } from '@taiga-ui/core';
import { TuiAvatar, TuiFileLike, TuiFiles } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';

export interface OwnTrackUploadResult {
  file: File;
  dto: UploadTrackDto;
}

interface OwnTrackUploadDialogContext {
  completeWith: (result: OwnTrackUploadResult | null) => void;
}

@Component({
  selector: 'app-own-track-upload-dialog',
  imports: [AsyncPipe, ReactiveFormsModule, TuiAvatar, TuiButton, TuiError, TuiFiles, TuiLabel, TuiLink, TuiTextfield],
  templateUrl: './own-track-upload-dialog.html',
  styleUrl: './own-track-upload-dialog.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OwnTrackUploadDialog {
  private readonly context = inject<OwnTrackUploadDialogContext>(POLYMORPHEUS_CONTEXT);
  private readonly fb = inject(NonNullableFormBuilder);

  /** Comma-separated accept list — bound to the input's [accept] and reused for the tuiFileRejected pipe. */
  protected readonly accept = 'audio/mpeg,audio/wav,audio/ogg,audio/mp4,audio/x-m4a,audio/webm';

  protected readonly fileControl = new FormControl<TuiFileLike | null>(null, Validators.required);
  protected readonly fileSizeError = signal<string | null>(null);
  protected readonly isPreparing = signal(false);

  protected readonly form = this.fb.group({
    title: this.fb.control('', { validators: [Validators.required, Validators.maxLength(100)] }),
    artist: this.fb.control(''),
    genre: this.fb.control(''),
  });

  constructor() {
    this.fileControl.valueChanges.subscribe((file) => {
      this.validateFileSize(file);
    });
  }

  protected removeFile(): void {
    this.fileControl.setValue(null);
    this.fileSizeError.set(null);
  }

  protected async submit(): Promise<void> {
    this.form.markAllAsTouched();
    this.fileControl.markAsTouched();

    const file = this.fileControl.value;

    if (this.form.invalid || this.fileControl.invalid || !file || this.fileSizeError()) {
      return;
    }

    this.isPreparing.set(true);

    let duration: number;
    try {
      // The control's value is produced by tuiInputFiles from a native
      // file picker/drop, so at runtime it's always a real File — TuiFileLike
      // is just the looser type the component API exposes.
      duration = await getAudioDuration(file as File);
    } catch {
      this.isPreparing.set(false);
      this.fileSizeError.set('Could not read this file — it may be corrupted.');
      return;
    }

    this.isPreparing.set(false);

    const { title, artist, genre } = this.form.getRawValue();

    this.context.completeWith({
      file: file as File,
      dto: {
        title: title.trim(),
        artist: artist.trim() || undefined,
        genre: genre.trim() || undefined,
        duration,
      },
    });
  }

  protected cancel(): void {
    this.context.completeWith(null);
  }

  private validateFileSize(file: TuiFileLike | null): void {
    this.fileSizeError.set(null);

    if (!file || !('size' in file) || typeof file.size !== 'number') {
      return;
    }

    if (file.size > TRACK_UPLOAD_LIMITS.maxFileSizeBytes) {
      this.fileSizeError.set(`File is larger than ${MAX_FILE_SIZE_MB}MB.`);
    }
  }
}
