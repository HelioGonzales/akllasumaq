import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURLLogin = `${environment.api}users`

  constructor(private http: HttpClient, private localStorageSvc: LocalstorageService, private router: Router) { }

  login(email: string, passwordHash: string): Observable<User> {
    return this.http.post<User>(`${this.apiURLLogin}/login`, { email, passwordHash })
  }

  logout() {
    this.localStorageSvc.removeToken()
    this.router.navigate(['/login'])
  }

}
