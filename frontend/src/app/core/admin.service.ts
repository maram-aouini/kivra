import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'https://kivra-a5su.onrender.com/api/admin';

  constructor(private http: HttpClient) {}

  getStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getUserContents(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/${userId}/contents`);
  }

  searchUsers(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/search?query=${encodeURIComponent(query)}`);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }
}
