import type { AbstractControl } from '@angular/forms';

export const passwordMatchValidator = (control: AbstractControl) => {
  console.log(Date.now());
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword || !password.touched || !confirmPassword.touched) {
    return null;
  }

  if (password.value !== confirmPassword.value) {
    password.setErrors({ passwordMismatch: true });
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }

  if (confirmPassword.hasError('passwordMismatch')) {
    const errors = { ...confirmPassword.errors };
    delete errors['passwordMismatch'];
    confirmPassword.setErrors(Object.keys(errors).length > 0 ? errors : null);
  }

  if (password.hasError('passwordMismatch')) {
    const errors = { ...password.errors };
    delete errors['passwordMismatch'];
    password.setErrors(Object.keys(errors).length > 0 ? errors : null);
  }

  return null;
};
