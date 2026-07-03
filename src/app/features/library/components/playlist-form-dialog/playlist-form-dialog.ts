import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CreatePlaylistDto } from '@features/library/interfaces/library-api.model';
import { PlaylistItem } from '@features/library/interfaces/library.model';
import { TuiButton, TuiError, TuiLabel, TuiTextfield } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';

export interface PlaylistFormDialogData {
  playlist?: PlaylistItem;
}

interface PlaylistFormDialogContext {
  data: PlaylistFormDialogData;
  completeWith: (result: CreatePlaylistDto | null) => void;
}

@Component({
  selector: 'app-playlist-form-dialog',
  imports: [ReactiveFormsModule, TuiButton, TuiError, TuiLabel, TuiTextfield],
  templateUrl: './playlist-form-dialog.html',
  styleUrl: './playlist-form-dialog.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistFormDialog {
  private readonly context = inject<PlaylistFormDialogContext>(POLYMORPHEUS_CONTEXT);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly isEditMode = signal(!!this.context.data.playlist);

  protected readonly form = this.fb.group({
    name: this.fb.control(this.context.data.playlist?.name ?? '', {
      validators: [Validators.required, Validators.maxLength(100)],
    }),

    description: this.fb.control(this.context.data.playlist?.description ?? '', {
      validators: [Validators.maxLength(500)],
    }),
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, description } = this.form.getRawValue();

    this.context.completeWith({
      name: name.trim(),
      description: description.trim() || undefined,
    });
  }

  protected cancel(): void {
    this.context.completeWith(null);
  }
}
