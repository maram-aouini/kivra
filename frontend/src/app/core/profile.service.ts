import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'https://kivra-a5su.onrender.com/api/auth/profile';

  constructor(private http: HttpClient) {}

  updateUsername(newUsername: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/username`, { newUsername });
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/password`, { oldPassword, newPassword });
  }
}
