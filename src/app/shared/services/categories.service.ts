import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }



  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.api}categories`)
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${environment.api}categories`, category)
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`${environment.api}categories/${categoryId}`)
  }
}
