import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import Input, { InputData } from '@shared/components/input/input';
import { TuiButton, TuiError, tuiValidationErrorsProvider } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [Input, ReactiveFormsModule, TuiButton, TuiError, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiValidationErrorsProvider({ passwordsMismatch: `The passwords don't match` })],
})
export class RegisterPage {
  passwordsMatchValidator = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value as string | undefined;
    const confirm = group.get('confirmPassword')?.value as string | undefined;

    return password === confirm ? null : { passwordsMismatch: true };
  };

  registerForm = new FormGroup(
    {
      email: new FormControl('', [(control) => Validators.required(control), (control) => Validators.email(control)]),
      password: new FormControl('', [
        (control) => Validators.required(control),
        (control) => Validators.minLength(4)(control),
      ]),
      confirmPassword: new FormControl('', [(control) => Validators.required(control)]),
    },
    { validators: this.passwordsMatchValidator },
  );

  emailInputData: InputData = {
    name: 'Email',
    placeholder: 'example@gmail.com',
    formControl: this.registerForm.controls.email,
    type: 'text',
  };

  passwordInputData: InputData = {
    name: 'Password',
    placeholder: 'Password',
    formControl: this.registerForm.controls.password,
    type: 'password',
  };

  confirmPasswordInputData: InputData = {
    name: 'Confirm password',
    placeholder: 'Confirm password',
    formControl: this.registerForm.controls.confirmPassword,
    type: 'password',
  };

  submit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const data = this.registerForm.getRawValue();

    console.log(data);
  }
}
