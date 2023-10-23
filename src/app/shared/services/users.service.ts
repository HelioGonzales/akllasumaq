import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiURLUsers = environment.api

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURLUsers}users`)
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}users/${userId}`)
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}users`, user)
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiURLUsers}users/${user._id}`, user)
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLUsers}users/${userId}`)
  }
}
