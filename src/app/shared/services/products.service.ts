import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiURLProducts = environment.api

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURLProducts}products`)
  }

  // getCategory(categoryId: string): Observable<Category> {
  //   return this.http.get<Category>(`${this.apiURLCategories}categories/${categoryId}`)
  // }

  // createCategory(category: Category): Observable<Category> {
  //   return this.http.post<Category>(`${this.apiURLCategories}categories`, category)
  // }

  // updateCategory(category: Category): Observable<Category> {
  //   return this.http.put<Category>(`${this.apiURLCategories}categories/${category._id}`, category)
  // }

  // deleteCategory(categoryId: string): Observable<any> {
  //   return this.http.delete<any>(`${this.apiURLCategories}categories/${categoryId}`)
  // }

}
