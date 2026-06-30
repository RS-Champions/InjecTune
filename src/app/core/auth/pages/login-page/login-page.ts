import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Input, { InputData } from '@shared/components/input/input';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, Input, ReactiveFormsModule, TuiButton],
  templateUrl: './login-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './login-page.less',
})
export class LoginPage {
  protected loginForm = new FormGroup({
    email: new FormControl('', [(control) => Validators.required(control), (control) => Validators.email(control)]),
    password: new FormControl('', [(control) => Validators.required(control)]),
  });

  protected emailInputData: InputData = {
    name: 'Email',
    placeholder: 'example@gmail.com',
    formControl: this.loginForm.controls.email,
    type: 'text',
  };

  protected passwordInputData: InputData = {
    name: 'Password',
    placeholder: 'Password',
    formControl: this.loginForm.controls.password,
    type: 'password',
  };

  protected submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const data = this.loginForm.getRawValue();

    console.log(data);
  }
}
