import { AbstractControl, ValidationErrors } from '@angular/forms';

export function matchWithPassword(control: AbstractControl): ValidationErrors | null {
  const passwordControl = control.parent?.get('password');

  const password = passwordControl?.value as string | null;
  const confirmPassword = control.value as string | null;

  if (password == null || confirmPassword == null) {
    return { passwordsMismatch: true };
  }

  return password === confirmPassword ? null : { passwordsMismatch: true };
}
