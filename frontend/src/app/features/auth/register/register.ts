import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/auth.service';
import { RegisterRequest } from '../../../models/auth.model';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  request: RegisterRequest = { username: '', email: '', password: '', confirmPassword: '' };
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    if (this.request.password !== this.request.confirmPassword) {
      this.errorMessage = 'Le password non coincidono';
      this.snackBar.open(this.errorMessage, 'Chiudi', { duration: 3000 });
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.authService.register(this.request).subscribe({
      next: () => this.router.navigate(['/overview']),
      error: (err) => {
        if (err.status === 0) {
          this.errorMessage = 'Impossibile connettersi al server. Riprova più tardi.';
        } else {
          const backendMessage = typeof err.error === 'string'
            ? err.error
            : err.error?.message;
          this.errorMessage = backendMessage || 'Errore durante la registrazione';
        }
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}