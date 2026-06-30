import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import Input, { InputData } from '@shared/components/input/input';
import { TuiButton, TuiError, tuiValidationErrorsProvider } from '@taiga-ui/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceInterface } from '@core/auth/services/auth-service-interface/auth-service-interface';
import { AuthCredentials } from '@core/auth/interfaces/auth-credentials';

@Component({
  selector: 'app-register-page',
  imports: [Input, ReactiveFormsModule, TuiButton, TuiError, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiValidationErrorsProvider({ passwordsMismatch: `The passwords don't match` })],
})
export class RegisterPage {
  private passwordsMatchValidator = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value as string | undefined;
    const confirm = group.get('confirmPassword')?.value as string | undefined;

    return password === confirm ? null : { passwordsMismatch: true };
  };
  private authService = inject(AuthServiceInterface);
  private router = inject(Router);

  protected isLoading = signal(false);
  protected error = signal<string | null>(null);

  protected registerForm = new FormGroup(
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

  protected emailInputData: InputData = {
    name: 'Email',
    placeholder: 'example@gmail.com',
    formControl: this.registerForm.controls.email,
    type: 'text',
  };

  protected passwordInputData: InputData = {
    name: 'Password',
    placeholder: 'Password',
    formControl: this.registerForm.controls.password,
    type: 'password',
  };

  protected confirmPasswordInputData: InputData = {
    name: 'Confirm password',
    placeholder: 'Confirm password',
    formControl: this.registerForm.controls.confirmPassword,
    type: 'password',
  };

  protected submit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const data = this.registerForm.getRawValue();

    this.isLoading.set(true);

    const credentials: AuthCredentials = {
      email: data.email ?? '',
      password: data.password ?? '',
    };
    this.authService.register(credentials).subscribe({
      next: () => {
        this.isLoading.set(false);
        void this.router.navigate(['/discover']);
      },
      error: (error: unknown) => {
        this.isLoading.set(false);
        if (error instanceof Error) {
          this.error.set(error.message);
        } else {
          this.error.set('An unexpected error occurred.');
        }
      },
    });
  }
}
