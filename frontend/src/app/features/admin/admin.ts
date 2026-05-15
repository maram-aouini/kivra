import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../core/admin.service';

interface UserStats {
  totalUsers: number;
  totalContents: number;
}

interface UserData {
  id: number;
  username: string;
  email: string;
  admin: boolean;
  createdAt: string;
  contentCount: number;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    RouterLink
  ],
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss']
})
export class Admin implements OnInit {
  stats: UserStats | null = null;
  users: UserData[] = [];
  searchQuery: string = '';
  loading: boolean = true;

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadUsers();
  }

  loadStats(): void {
    this.adminService.getStats().subscribe({
      next: (data) => {
        this.stats = { ...data };
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Errore nel caricamento delle statistiche', err);
      }
    });
  }

  loadUsers(): void {
    this.loading = true;
    console.log('Caricamento utenti...');
    this.adminService.getUsers().subscribe({
      next: (data) => {
        console.log('Utenti caricati:', data);
        this.users = [...data];
        this.loading = false;
        this.cdr.markForCheck();
        console.log('Loading settato a false, loading=', this.loading);
      },
      error: (err) => {
        console.error('Errore nel caricamento degli utenti', err);
        console.error('Status:', err.status);
        console.error('Message:', err.message);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.loadUsers();
      return;
    }

    this.loading = true;
    this.adminService.searchUsers(this.searchQuery).subscribe({
      next: (data) => {
        this.users = [...data];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Errore nella ricerca', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  deleteUser(userId: number, username: string): void {
    const confirmed = confirm(`Sei sicuro di voler eliminare l'utente "${username}" e tutti i suoi contenuti?`);
    if (!confirmed) return;

    this.adminService.deleteUser(userId).subscribe({
      next: () => {
        console.log('Utente eliminato, ricaricando...');
        this.loadUsers();
        this.loadStats();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Errore nell\'eliminazione dell\'utente', err);
        this.cdr.markForCheck();
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
}
