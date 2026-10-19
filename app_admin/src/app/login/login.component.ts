import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  formError = '';
  submitting = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'Email and password are required';
      return;
    }
    this.submitting = true;
    this.authenticationService.login({ email: this.credentials.email, name: '' }, this.credentials.password)
      .subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/']);
        },
        error: () => {
          this.submitting = false;
          this.formError = 'Unable to log in. Check your credentials.';
        }
      });
  }
}
