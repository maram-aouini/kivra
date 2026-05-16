import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ContentService } from '../../core/content.service';
import { UserContent } from '../../models/content.model';
import { AuthService } from '../../core/auth.service';
import { ContentDetail } from '../content/content-detail/content-detail';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-overview',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    NgStyle
  ],
  templateUrl: './overview.html',
  styleUrl: './overview.scss'
})
export class Overview implements OnInit {
  username = '';
  totalContents = 0;
  inProgress = 0;
  completed = 0;
  toStart = 0;

  inProgressContents: UserContent[] = [];
  completedContents: UserContent[] = [];
  recentContents: UserContent[] = [];

  animatedTotal = 0;
  animatedInProgress = 0;
  animatedCompleted = 0;
  animatedToStart = 0;

  typeStats: { label: string, type: string, icon: string, count: number, color: string }[] = [];

  categories = [
    { label: 'Film', type: 'FILM', icon: '🎬' },
    { label: 'Serie TV', type: 'SERIE_TV', icon: '📺' },
    { label: 'Anime', type: 'ANIME', icon: '⛩️' },
    { label: 'Manga', type: 'MANGA', icon: '📚' },
    { label: 'Libri', type: 'LIBRO', icon: '📖' }
  ];

  constructor(
    private contentService: ContentService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.username = this.authService.getUsername() || '';
  }

  ngOnInit() {
    this.contentService.getAll().subscribe({
      next: (data: UserContent[]) => {
        this.totalContents = data.length;
        this.inProgress = data.filter(c => c.status === 'IN_CORSO').length;
        this.completed = data.filter(c => c.status === 'COMPLETATO').length;
        this.toStart = data.filter(c => c.status === 'DA_INIZIARE').length;

        this.inProgressContents = data
          .filter(c => c.status === 'IN_CORSO')
          .slice(0, 6);

        this.completedContents = data
          .filter(c => c.status === 'COMPLETATO')
          .slice(0, 6);

        this.recentContents = [...data]
          .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
          .slice(0, 6);

        this.typeStats = [
          { label: 'Film', type: 'FILM', icon: '🎬', count: data.filter(c => c.type === 'FILM').length, color: '#ff7043' },
          { label: 'Serie TV', type: 'SERIE_TV', icon: '📺', count: data.filter(c => c.type === 'SERIE_TV').length, color: '#ab47bc' },
          { label: 'Anime', type: 'ANIME', icon: '⛩️', count: data.filter(c => c.type === 'ANIME').length, color: '#26c6da' },
          { label: 'Manga', type: 'MANGA', icon: '📚', count: data.filter(c => c.type === 'MANGA').length, color: '#66bb6a' },
          { label: 'Libri', type: 'LIBRO', icon: '📖', count: data.filter(c => c.type === 'LIBRO').length, color: '#ffa726' }
        ];

        this.animateCounters();
        this.cdr.detectChanges();
      }
    });
  }

  animateCounters() {
    const duration = 1200;
    const steps = 40;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);

      this.animatedTotal = Math.round(this.totalContents * ease);
      this.animatedInProgress = Math.round(this.inProgress * ease);
      this.animatedCompleted = Math.round(this.completed * ease);
      this.animatedToStart = Math.round(this.toStart * ease);

      this.cdr.detectChanges();

      if (step >= steps) clearInterval(timer);
    }, interval);
  }

  getProgressWidth(count: number): string {
    if (this.totalContents === 0) return '0%';
    return `${(count / this.totalContents) * 100}%`;
  }

  openDetail(content: UserContent) {
    this.dialog.open(ContentDetail, {
      width: '700px',
      maxWidth: '95vw',
      data: content,
      panelClass: 'detail-dialog'
    });
  }

  goToCategory(type: string) {
    this.router.navigate(['/contents'], { queryParams: { type } });
  }

  goToContents() {
    this.router.navigate(['/contents']);
  }

  getTypeLabel(type: string): string {
    const map: any = {
      'FILM': '🎬 Film',
      'SERIE_TV': '📺 Serie TV',
      'ANIME': '⛩️ Anime',
      'MANGA': '📚 Manga',
      'LIBRO': '📖 Libro'
    };
    return map[type] || type;
  }
}