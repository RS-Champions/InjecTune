import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';

export interface AboutLeaveDialogData {
  secondsLeft: number;
}

interface AboutLeaveDialogContext {
  data: AboutLeaveDialogData;
  completeWith: (answer: boolean) => void;
}

@Component({
  selector: 'app-about-leave-dialog',
  imports: [TuiButton, TuiIcon],
  templateUrl: './about-leave-dialog.html',
  styleUrl: './about-leave-dialog.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutLeaveDialog implements OnInit, OnDestroy {
  private readonly context = inject<AboutLeaveDialogContext>(POLYMORPHEUS_CONTEXT);

  protected readonly seconds = signal(this.context.data.secondsLeft);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.seconds.update((s) => {
        if (s <= 1) {
          this.clearIntervalId();
          this.context.completeWith(false);
        }
        return Math.max(0, s - 1);
      });
    }, 1000);
  }

  ngOnDestroy(): void {
    this.clearIntervalId();
  }

  protected stay(): void {
    this.context.completeWith(false);
  }

  protected leave(): void {
    this.context.completeWith(true);
  }

  private clearIntervalId(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
