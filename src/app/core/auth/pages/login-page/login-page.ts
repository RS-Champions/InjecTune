import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthCredentials } from '@core/auth/interfaces/auth-credentials';
import { AuthServiceInterface } from '@core/auth/services/auth-service-interface/auth-service-interface';
import { Equalizer } from '@shared/components/equalizer/equalizer';
import Input, { InputData } from '@shared/components/input/input';
import { TuiButton, TuiErrorComponent } from '@taiga-ui/core';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, Input, ReactiveFormsModule, TuiButton, TuiErrorComponent, Equalizer],
  templateUrl: './login-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './login-page.less',
})
export class LoginPage {
  private authService = inject(AuthServiceInterface);
  private router = inject(Router);

  protected isLoading = signal(false);
  protected error = signal<string | null>(null);
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

    this.isLoading.set(true);

    const credentials: AuthCredentials = {
      email: data.email ?? '',
      password: data.password ?? '',
    };
    this.authService.login(credentials).subscribe({
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
