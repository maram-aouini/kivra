import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContentService } from '../../../core/content.service';
import { UserContent, ContentType, ContentStatus } from '../../../models/content.model';
import { ContentCard } from '../content-card/content-card';
import { ContentForm } from '../content-form/content-form';

@Component({
  selector: 'app-content-list',
  imports: [
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ContentCard
  ],
  templateUrl: './content-list.html',
  styleUrl: './content-list.scss'
})
export class ContentList implements OnInit {
  allContents: UserContent[] = [];
  filteredContents: UserContent[] = [];
  loading = false;
  selectedType: ContentType | undefined;
  selectedStatus: ContentStatus | undefined;
  searchQuery = '';
  showBackToTop = false;

  contentTypes = [
    { value: undefined, label: 'Tutti i tipi' },
    { value: 'FILM', label: '🎬 Film' },
    { value: 'SERIE_TV', label: '📺 Serie TV' },
    { value: 'ANIME', label: '⛩️ Anime' },
    { value: 'MANGA', label: '📚 Manga' },
    { value: 'LIBRO', label: '📖 Libro' }
  ];

  contentStatuses = [
    { value: undefined, label: 'Tutti gli stati' },
    { value: 'DA_INIZIARE', label: 'Da iniziare' },
    { value: 'IN_CORSO', label: 'In corso' },
    { value: 'COMPLETATO', label: 'Completato' }
  ];

  constructor(
    private contentService: ContentService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedType = params['type'] as ContentType || undefined;
      this.loadContents();
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTop = window.scrollY > 400;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  loadContents() {
    this.loading = true;
    this.contentService.getAll(this.selectedType, this.selectedStatus).subscribe({
      next: (data) => {
        this.allContents = [...data];
        this.applySearch();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.allContents = [];
        this.filteredContents = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  applySearch() {
    if (!this.searchQuery.trim()) {
      this.filteredContents = [...this.allContents];
    } else {
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredContents = this.allContents.filter(c =>
        c.title.toLowerCase().includes(query)
      );
    }
    this.cdr.detectChanges();
  }

  onSearchChange() {
    this.applySearch();
  }

  onFilterChange() {
    this.loadContents();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(ContentForm, {
      width: '500px',
      data: null
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadContents();
    });
  }

  openEditDialog(content: UserContent) {
    const dialogRef = this.dialog.open(ContentForm, {
      width: '500px',
      data: content
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadContents();
    });
  }

  onDelete(id: number) {
    this.contentService.delete(id).subscribe(() => this.loadContents());
  }
}