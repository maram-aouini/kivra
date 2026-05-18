export type ContentType = 'FILM' | 'SERIE_TV' | 'ANIME' | 'MANGA' | 'LIBRO';
export type ContentStatus = 'DA_INIZIARE' | 'IN_CORSO' | 'COMPLETATO';

export interface UserContent {
  id: number;
  title: string;
  type: ContentType;
  status: ContentStatus;
  externalId?: string;
  coverUrl?: string;
  description?: string;
  rating?: number;
  favorite?: boolean;
  notes?: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  imagePosition?: number;
}

export interface UserContentRequest {
  title: string;
  type: ContentType;
  status: ContentStatus;
  externalId?: string;
  coverUrl?: string;
  description?: string;
  rating?: number;
  favorite?: boolean;
  notes?: string;
  startDate?: string;
  endDate?: string;
  imagePosition?: number;
}