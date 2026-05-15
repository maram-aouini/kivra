import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ProfileService } from '../../core/profile.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile implements OnInit {
  currentUsername: string = '';
  newUsername: string = '';
  showUsernameForm: boolean = false;
  usernameLoading: boolean = false;

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  showPasswordForm: boolean = false;
  passwordLoading: boolean = false;
  hideOldPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentUsername = this.authService.getUsername() || '';
  }

  toggleUsernameForm(): void {
    this.showUsernameForm = !this.showUsernameForm;
    if (!this.showUsernameForm) {
      this.newUsername = '';
    }
  }

  togglePasswordForm(): void {
    this.showPasswordForm = !this.showPasswordForm;
    if (!this.showPasswordForm) {
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    }
  }

  updateUsername(): void {
    if (!this.newUsername.trim()) {
      this.showError('Inserisci un nuovo username');
      return;
    }

    if (this.newUsername === this.currentUsername) {
      this.showError('Il nuovo username è uguale a quello attuale');
      return;
    }

    this.usernameLoading = true;
    this.profileService.updateUsername(this.newUsername).subscribe({
      next: (response) => {
        this.currentUsername = response.username;
        this.authService.updateLocalUsername(response.username);
        this.showUsernameForm = false;
        this.newUsername = '';
        this.usernameLoading = false;
        this.cdr.markForCheck();
        this.showSuccess('Username aggiornato con successo');
      },
      error: (err) => {
        this.usernameLoading = false;
        this.cdr.markForCheck();
        if (err.status === 400 && err.error) {
          this.showError(err.error.message || 'Errore nell\'aggiornamento dello username');
        } else {
          this.showError('Errore nell\'aggiornamento dello username');
        }
      }
    });
  }

  updatePassword(): void {
    if (!this.oldPassword.trim() || !this.newPassword.trim() || !this.confirmPassword.trim()) {
      this.showError('Compila tutti i campi');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.showError('Le password non coincidono');
      return;
    }

    if (this.newPassword.length < 6) {
      this.showError('La password deve avere almeno 6 caratteri');
      return;
    }

    this.passwordLoading = true;
    this.profileService.updatePassword(this.oldPassword, this.newPassword).subscribe({
      next: () => {
        this.showPasswordForm = false;
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        this.passwordLoading = false;
        this.cdr.markForCheck();
        this.showSuccess('Password aggiornata con successo');
      },
      error: (err) => {
        this.passwordLoading = false;
        this.cdr.markForCheck();
        if (err.status === 400 && err.error) {
          this.showError(err.error.message || 'Errore nell\'aggiornamento della password');
        } else {
          this.showError('Errore nell\'aggiornamento della password');
        }
      }
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Chiudi', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Chiudi', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
