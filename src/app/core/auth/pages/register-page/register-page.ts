import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import Input, { InputData } from '@shared/components/input/input';
import { matchWithPassword } from '@shared/validators/match-with-password';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-register-page',
  imports: [Input, ɵInternalFormsSharedModule, ReactiveFormsModule, TuiButton],
  templateUrl: './register-page.html',
  styleUrl: './register-page.less',
})
export class RegisterPage {
  registerForm = new FormGroup({
    email: new FormControl('', [(control) => Validators.required(control), (control) => Validators.email(control)]),
    password: new FormControl('', [
      (control) => Validators.required(control),
      (control) => Validators.minLength(4)(control),
    ]),
    confirmPassword: new FormControl('', [
      (control) => Validators.required(control),
      (control) => matchWithPassword(control),
    ]),
  });

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
