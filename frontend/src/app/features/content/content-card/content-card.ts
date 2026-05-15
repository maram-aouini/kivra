import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../../core/content.service';
import { UserContent } from '../../../models/content.model';
import { ConfirmDialog } from '../../../shared/confirm-dialog';
import { ContentDetail } from '../content-detail/content-detail';

@Component({
  selector: 'app-content-card',
  imports: [
    NgStyle,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './content-card.html',
  styleUrls: ['./content-card.scss']
})
export class ContentCard implements OnInit {
  @Input() content!: UserContent;
  @Output() edit = new EventEmitter<UserContent>();
  @Output() delete = new EventEmitter<number>();

  imagePosition = 50;
  isDragging = false;
  dragStartY = 0;
  dragStartPosition = 50;
  repositionMode = false;

  constructor(
    private contentService: ContentService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.imagePosition = this.content.imagePosition ?? 50;
  }

  getImageStyle() {
    return {
      'object-position': `center ${this.imagePosition}%`,
      'cursor': this.repositionMode ? 'grab' : 'default'
    };
  }

  toggleRepositionMode() {
    this.repositionMode = !this.repositionMode;
  }

  onMouseDown(event: MouseEvent) {
    if (!this.repositionMode) return;
    this.isDragging = true;
    this.dragStartY = event.clientY;
    this.dragStartPosition = this.imagePosition;
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging || !this.repositionMode) return;
    const deltaY = event.clientY - this.dragStartY;
    const newPosition = this.dragStartPosition + (deltaY / 2);
    this.imagePosition = Math.min(100, Math.max(0, newPosition));
    event.preventDefault();
  }

  onMouseUp() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.savePosition();
  }

  onTouchStart(event: TouchEvent) {
    if (!this.repositionMode) return;
    this.isDragging = true;
    this.dragStartY = event.touches[0].clientY;
    this.dragStartPosition = this.imagePosition;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging || !this.repositionMode) return;
    const deltaY = event.touches[0].clientY - this.dragStartY;
    const newPosition = this.dragStartPosition + (deltaY / 2);
    this.imagePosition = Math.min(100, Math.max(0, newPosition));
    event.preventDefault();
  }

  onTouchEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.savePosition();
  }

  savePosition() {
    const request = {
      title: this.content.title,
      type: this.content.type,
      status: this.content.status,
      coverUrl: this.content.coverUrl,
      description: this.content.description,
      rating: this.content.rating,
      notes: this.content.notes,
      startDate: this.content.startDate,
      endDate: this.content.endDate,
      imagePosition: Math.round(this.imagePosition)
    };
    this.contentService.update(this.content.id, request).subscribe();
  }

  onDeleteClick() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      data: { message: `Sei sicura di voler eliminare "${this.content.title}"?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.delete.emit(this.content.id);
    });
  }

  openDetail() {
  this.dialog.open(ContentDetail, {
    width: '780px',
    minHeight: '500px',
    maxWidth: '95vw',
    data: this.content,
    panelClass: 'detail-dialog'
  });
}

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