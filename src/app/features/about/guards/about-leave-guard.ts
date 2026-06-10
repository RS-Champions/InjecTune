import { CanDeactivateFn } from '@angular/router';

import { AboutPage } from '@features/about/pages/about-page/about-page';

export const aboutLeaveGuard: CanDeactivateFn<AboutPage> = (component) => {
  if (!component.isLocked) {
    return true;
  }

  const seconds = component.secondsLeft;

  return globalThis.confirm(`Please stay on this page for ${seconds.toString()} more seconds.`);
};
