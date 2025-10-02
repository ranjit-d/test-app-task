import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ERROR_MESSAGES } from 'src/app/constant';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:any= FormGroup;
  showPassword = false;
  errorMessage = ERROR_MESSAGES;

  constructor(
    private fb: FormBuilder,
    private loginsvc: LoginService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
   
   this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

    onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.loginsvc.onLogin(email, password).subscribe({
        next: (res: any) => {
          if (res.status === 1) {
            // ✅ Save session in AuthService
            this.auth.setSession(res.data.sessionToken, res.data);

            this.showToast('Login successful.', 'success');

            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 1000);
          } else {
            this.showToast(res.message || 'Invalid email or password.', 'error');
          }
        },
        error: (err) => {
          this.showToast(err.error?.message || 'Login failed. Please try again.', 'error');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  showToast(message: string, type: 'success' | 'error'): void {
    const toastElement = document.getElementById('loginToast');
    const toastBody = document.getElementById('toastMessage');

    if (toastElement && toastBody) {
      toastBody.textContent = message;
      toastElement.classList.remove('text-bg-success', 'text-bg-danger');
      toastElement.classList.add(type === 'success' ? 'text-bg-success' : 'text-bg-danger');

      const toast = new (window as any).bootstrap.Toast(toastElement);
      toast.show();
    }
  }
}