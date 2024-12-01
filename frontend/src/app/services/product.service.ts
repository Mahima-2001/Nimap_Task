import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getProducts(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products?page=${page}&pageSize=${pageSize}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product);
  }

  updateProduct(productId: number, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${productId}`, product);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${productId}`);
  }
}
