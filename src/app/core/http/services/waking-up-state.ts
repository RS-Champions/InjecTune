import { inject, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { TOAST_DURATION_MS } from '@shared/constants/constants';
import { TuiToastService } from '@taiga-ui/kit';

@Injectable({
  providedIn: 'root',
})
export class WakingUpState {
  private readonly toasts = inject(TuiToastService);

  private pendingRequestsCount = 0;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private toastSubscription: Subscription | null = null;

  requestStarted(): void {
    const WAKE_UP_DETECTION_DELAY_MS = 3000;
    this.pendingRequestsCount++;

    if (this.timeoutId === null && this.toastSubscription === null) {
      this.timeoutId = setTimeout(() => {
        this.timeoutId = null;

        this.showToast('Waking up the server — this may take up to a minute after a period of inactivity.', 'info', 0);
      }, WAKE_UP_DETECTION_DELAY_MS);
    }
  }

  requestFinished(): void {
    this.pendingRequestsCount = Math.max(0, this.pendingRequestsCount - 1);

    if (this.pendingRequestsCount === 0) {
      if (this.timeoutId !== null) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }

      const wasWakingUp = this.toastSubscription !== null;

      if (wasWakingUp) {
        this.clearToast();
        this.showToast('Woke up successfully', 'positive', TOAST_DURATION_MS);
      }
    }
  }

  private showToast(message: string, appearance: string, autoClose: number): void {
    this.clearToast();

    this.toastSubscription = this.toasts.open(message, { appearance, autoClose, closable: true }).subscribe({
      complete: () => {
        this.clearToast();
      },
    });
  }

  private clearToast(): void {
    if (this.toastSubscription) {
      this.toastSubscription.unsubscribe();
      this.toastSubscription = null;
    }
  }
}
