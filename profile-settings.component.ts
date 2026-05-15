import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  usernameForm!: FormGroup;
  passwordForm!: FormGroup;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.usernameForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onUpdateUsername() {
    if (this.usernameForm.valid) {
      this.profileService.updateUsername(this.usernameForm.value.username).subscribe({
        next: () => this.message = 'Username aggiornato con successo!',
        error: (err) => this.message = 'Errore durante l\'aggiornamento dello username.'
      });
    }
  }

  onUpdatePassword() {
    if (this.passwordForm.valid) {
      const { oldPassword, newPassword } = this.passwordForm.value;
      this.profileService.updatePassword(oldPassword, newPassword).subscribe({
        next: () => {
          this.message = 'Password aggiornata con successo!';
          this.passwordForm.reset();
        },
        error: (err) => this.message = 'Errore: verifica la tua vecchia password.'
      });
    }
  }
}