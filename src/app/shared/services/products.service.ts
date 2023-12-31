import { HttpClient, HttpParams } from '@angular/common/http';
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

  getProducts(categoriesFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams()

    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','))
    }
    return this.http.get<Product[]>(`${this.apiURLProducts}products`, { params: params })
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProducts}products/${productId}`)
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiURLProducts}products`, productData)
  }

  updateProduct(productData: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(`${this.apiURLProducts}products/${productId}`, productData)
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLProducts}products/${productId}`)
  }

  getTotalProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiURLProducts}products/get/count`)
  }
}
