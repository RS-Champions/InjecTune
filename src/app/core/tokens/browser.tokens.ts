import { InjectionToken } from '@angular/core';
// eslint-disable-next-line unicorn/prefer-global-this
export const WINDOW = new InjectionToken<Window>('Global window object', { factory: () => window });

export const LOCAL_STORAGE = new InjectionToken<Storage>('Global localStorage object', { factory: () => localStorage });
