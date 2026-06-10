import { CanDeactivateFn } from '@angular/router';

import { AboutPage } from '@features/about/pages/about-page/about-page';
import { AboutLeaveDialog, AboutLeaveDialogData } from '@features/about/components/about-leave-dialog/about-leave-dialog';
import { inject } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { map } from 'rxjs';

export const aboutLeaveGuard: CanDeactivateFn<AboutPage> = (component) => {
  if (!component.isLocked) {
    return true;
  }

  const dialog = inject(TuiDialogService);

  return dialog
    .open<boolean>(new PolymorpheusComponent(AboutLeaveDialog), {
      label: 'Hold on!',
      size: 's',
      closable: false,
      data: { secondsLeft: component.secondsLeft } satisfies AboutLeaveDialogData,
    })
    .pipe(map(Boolean));
};
