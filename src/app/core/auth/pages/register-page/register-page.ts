import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import Input, { InputData } from '@shared/components/input/input';
import { TuiButton, TuiError, tuiValidationErrorsProvider } from '@taiga-ui/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceAbstract } from '@core/auth/services/auth-service-interface/auth-service-interface';
import { AuthCredentials } from '@core/auth/interfaces/auth-credentials';
import { Equalizer } from '@shared/components/equalizer/equalizer';
import { inputsData } from '../inputs-static-data';

@Component({
  selector: 'app-register-page',
  imports: [Input, ReactiveFormsModule, TuiButton, TuiError, RouterLink, Equalizer],
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
  private authService = inject(AuthServiceAbstract);
  private router = inject(Router);

  protected isLoading = signal(false);
  protected error = signal<string | null>(null);

  protected registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordsMatchValidator },
  );

  protected emailInputData: InputData = {
    ...inputsData.email,
    formControl: this.registerForm.controls.email,
  };

  protected passwordInputData: InputData = {
    ...inputsData.password,
    formControl: this.registerForm.controls.password,
  };

  protected confirmPasswordInputData: InputData = {
    ...inputsData.confirmPassword,
    formControl: this.registerForm.controls.confirmPassword,
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
