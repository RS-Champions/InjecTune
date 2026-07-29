import { inject, Injectable } from '@angular/core';
import { TuiToastService } from '@taiga-ui/kit';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WakingUpState {
  private readonly toasts = inject(TuiToastService);

  private pendingRequestsCount = 0;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private toastSubscription: Subscription | null = null;

  requestStarted(): void {
    this.pendingRequestsCount++;

    if (this.timeoutId === null && this.toastSubscription === null) {
      this.timeoutId = setTimeout(() => {
        this.toastSubscription = this.toasts
          .open('Waking up the server — this may take up to a minute after a period of inactivity.', {
            appearance: 'info',
            autoClose: 0,
          })
          .subscribe();
      }, 3000);
    }
  }

  requestFinished(): void {
    this.pendingRequestsCount = Math.max(0, this.pendingRequestsCount - 1);

    if (this.pendingRequestsCount === 0) {
      if (this.timeoutId !== null) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }

      this.toastSubscription?.unsubscribe();
      this.toastSubscription = null;
    }
  }
}
