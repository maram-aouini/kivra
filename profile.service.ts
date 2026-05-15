import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'api/auth/profile'; // Sostituisci con il tuo endpoint reale

  constructor(private http: HttpClient) {}

  updateUsername(newUsername: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/username`, { newUsername });
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/password`, { 
      oldPassword, 
      newPassword 
    });
  }
}