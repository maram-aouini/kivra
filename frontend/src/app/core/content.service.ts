import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserContent, UserContentRequest, ContentType, ContentStatus } from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private apiUrl = 'https://kivra-a5su.onrender.com/api/contents';

  constructor(private http: HttpClient) {}

  getAll(type?: ContentType, status?: ContentStatus): Observable<UserContent[]> {
    let params = new HttpParams();
    if (type) params = params.set('type', type);
    if (status) params = params.set('status', status);
    return this.http.get<UserContent[]>(this.apiUrl, { params });
  }

  add(request: UserContentRequest): Observable<UserContent> {
    return this.http.post<UserContent>(this.apiUrl, request);
  }

  update(id: number, request: UserContentRequest): Observable<UserContent> {
    return this.http.put<UserContent>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
