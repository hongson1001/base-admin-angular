import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { AuthService } from '@core/services/auth.service';
import { passwordValidators } from '@core/constants/validators';
import { AppInput } from '@shared/components/input/input';
import { Switch } from '@shared/components/switch/switch';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NzAlertModule,
    AppInput,
    Switch,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly errorMessage = signal('');

  readonly loginForm = this.fb.group({
    account: ['', [Validators.required]],
    password: ['', passwordValidators],
    remember: [true],
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const { account } = this.loginForm.getRawValue();

    // TODO: Replace with actual API call
    setTimeout(() => {
      const payload = btoa(JSON.stringify({
        sub: '1',
        email: account,
        name: 'Admin',
        roles: ['admin'],
        exp: Math.floor(Date.now() / 1000) + 86400,
      }));
      const fakeToken = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.${payload}.fake-signature`;

      this.authService.login(fakeToken);
      this.loading.set(false);
      this.router.navigate(['/']);
    }, 500);
  }
}
