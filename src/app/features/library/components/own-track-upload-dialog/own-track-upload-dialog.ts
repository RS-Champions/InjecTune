import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { UploadTrackDto } from '@features/library/interfaces/library-api.model';
import { TRACK_UPLOAD_LIMITS } from '@features/library/interfaces/track-upload-limits';
import { getAudioDuration } from '@shared/utils/get-audio-duration';
import { TuiButton, TuiError, TuiLabel, TuiTextfield } from '@taiga-ui/core';
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
  imports: [ReactiveFormsModule, TuiButton, TuiError, TuiLabel, TuiTextfield],
  templateUrl: './own-track-upload-dialog.html',
  styleUrl: './own-track-upload-dialog.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OwnTrackUploadDialog {
  private readonly context = inject<OwnTrackUploadDialogContext>(POLYMORPHEUS_CONTEXT);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly selectedFile = signal<File | null>(null);
  protected readonly fileError = signal<string | null>(null);
  protected readonly isPreparing = signal(false);

  protected readonly form = this.fb.group({
    title: this.fb.control('', { validators: [Validators.required, Validators.maxLength(100)] }),
    artist: this.fb.control(''),
    genre: this.fb.control(''),
  });

  /**
   * Native <input type="file"> for now — not Taiga's TuiInputFiles, since
   * its exact template API wasn't confirmed against v5.6 docs at the time
   * of writing. Swap this for TuiInputFiles once you've checked its real
   * attribute names; this native version is functionally equivalent, just
   * without the drag-and-drop polish.
   */
  protected onFileChosen(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.fileError.set(null);

    if (!file) {
      this.selectedFile.set(null);
      return;
    }

    if (!TRACK_UPLOAD_LIMITS.allowedMimeTypes.includes(file.type)) {
      this.fileError.set('Unsupported file type. Use MP3, WAV, OGG, or M4A.');
      input.value = '';
      this.selectedFile.set(null);
      return;
    }

    if (file.size > TRACK_UPLOAD_LIMITS.maxFileSizeBytes) {
      this.fileError.set('File is larger than 20MB.');
      input.value = '';
      this.selectedFile.set(null);
      return;
    }

    this.selectedFile.set(file);
  }

  protected async submit(): Promise<void> {
    const file = this.selectedFile();

    if (this.form.invalid || !file) {
      this.form.markAllAsTouched();
      if (!file) {
        this.fileError.set('Choose an audio file to upload.');
      }
      return;
    }

    this.isPreparing.set(true);

    let duration: number;
    try {
      duration = await getAudioDuration(file);
    } catch {
      this.isPreparing.set(false);
      this.fileError.set('Could not read this file — it may be corrupted.');
      return;
    }

    this.isPreparing.set(false);

    const { title, artist, genre } = this.form.getRawValue();

    this.context.completeWith({
      file,
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
}
