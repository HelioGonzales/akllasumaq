import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiURLCategories = environment.api

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiURLCategories}categories`)
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiURLCategories}categories/${categoryId}`)
  }

  createCategory(categoryData: FormData): Observable<Category> {
    return this.http.post<Category>(`${this.apiURLCategories}categories`, categoryData)
  }

  updateCategory(categoryData: FormData, categoryId: string): Observable<Category> {
    return this.http.put<Category>(`${this.apiURLCategories}categories/${categoryId}`, categoryData)
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLCategories}categories/${categoryId}`)
  }
}
