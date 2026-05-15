import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://kivra-a5su.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request).pipe(
      tap(response => this.saveToken(response))
    );
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap(response => this.saveToken(response))
    );
  }

  updateUsername(newUsername: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile/username`, { newUsername }).pipe(
      tap(response => {
        if (response.username) {
          localStorage.setItem('username', response.username);
        }
      })
    );
  }

  updateLocalUsername(username: string): void {
    localStorage.setItem('username', username);
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile/password`, { oldPassword, newPassword });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private saveToken(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('username', response.username);
    localStorage.setItem('email', response.email);
    localStorage.setItem('isAdmin', String(response.admin));
  }

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('isAdmin');
  }
}