import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURLLogin = `${environment.api}users`

  constructor(private http: HttpClient) { }

  login(email: string, passwordHash: string): Observable<User> {
    return this.http.post<User>(`${this.apiURLLogin}/login`, { email, passwordHash })
  }

}
