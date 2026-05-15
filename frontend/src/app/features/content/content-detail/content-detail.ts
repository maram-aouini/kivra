import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { NgStyle } from '@angular/common';
import { UserContent } from '../../../models/content.model';

@Component({
  selector: 'app-content-detail',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    NgStyle
  ],
  templateUrl: './content-detail.html',
  styleUrl: './content-detail.scss'
})
export class ContentDetail {
  constructor(
    public dialogRef: MatDialogRef<ContentDetail>,
    @Inject(MAT_DIALOG_DATA) public content: UserContent
  ) {}

  getStatusLabel(status: string): string {
    const map: any = {
      'DA_INIZIARE': 'Da iniziare',
      'IN_CORSO': 'In corso',
      'COMPLETATO': 'Completato'
    };
    return map[status] || status;
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

  getStatusColor(status: string): string {
    const map: any = {
      'DA_INIZIARE': 'default',
      'IN_CORSO': 'primary',
      'COMPLETATO': 'accent'
    };
    return map[status] || 'default';
  }
}