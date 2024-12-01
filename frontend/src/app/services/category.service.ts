import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:5000/api/categories';

  constructor(private http: HttpClient) {}

  // Fetch all categories
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Create a new category
  createCategory(name: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { name });
  }

  // Update a category
  updateCategory(id: number, name: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { name });
  }

  // Delete a category
  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
