import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../core/auth.service';
import { LoginRequest } from '../../../models/auth.model';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  request: LoginRequest = { email: '', password: '' };
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    this.authService.login(this.request).subscribe({
      next: () => this.router.navigate(['/overview']),
      error: (err) => {
        if (err.status === 0) {
          this.errorMessage = 'Impossibile connettersi al server. Riprova più tardi.';
        } else if (err.status === 401 || err.status === 403) {
          this.errorMessage = 'Email o password non validi';
        } else {
          const backendMessage = typeof err.error === 'string'
            ? err.error
            : err.error?.message;
          this.errorMessage = backendMessage || 'Email o password non validi';
        }
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}