import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ContentService } from '../../../core/content.service';
import { UserContent, UserContentRequest, ContentType, ContentStatus } from '../../../models/content.model';

@Component({
  selector: 'app-content-form',
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  templateUrl: './content-form.html',
  styleUrls: ['./content-form.scss']
})
export class ContentForm implements OnInit {
  request: UserContentRequest = {
    title: '',
    type: 'FILM',
    status: 'DA_INIZIARE',
    favorite: false
  };

  loading = false;
  isEdit = false;

  contentTypes: { value: ContentType, label: string }[] = [
    { value: 'FILM', label: '🎬 Film' },
    { value: 'SERIE_TV', label: '📺 Serie TV' },
    { value: 'ANIME', label: '⛩️ Anime' },
    { value: 'MANGA', label: '📚 Manga' },
    { value: 'LIBRO', label: '📖 Libro' }
  ];

  contentStatuses: { value: ContentStatus, label: string }[] = [
    { value: 'DA_INIZIARE', label: 'Da iniziare' },
    { value: 'IN_CORSO', label: 'In corso' },
    { value: 'COMPLETATO', label: 'Completato' }
  ];

  constructor(
    private contentService: ContentService,
    private dialogRef: MatDialogRef<ContentForm>,
    @Inject(MAT_DIALOG_DATA) public data: UserContent | null
  ) {}

  ngOnInit() {
    if (this.data) {
      this.isEdit = true;
      this.request = {
        title: this.data.title,
        type: this.data.type,
        status: this.data.status,
        coverUrl: this.data.coverUrl,
        description: this.data.description,
        rating: this.data.rating,
        notes: this.data.notes,
        startDate: this.data.startDate,
        endDate: this.data.endDate,
        favorite: this.data.favorite
      };
    }
  }

  onSubmit() {
    this.loading = true;
    const operation = this.isEdit
      ? this.contentService.update(this.data!.id, this.request)
      : this.contentService.add(this.request);

    operation.subscribe({
      next: () => this.dialogRef.close(true),
      error: () => this.loading = false
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}