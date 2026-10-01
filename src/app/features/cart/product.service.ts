import { inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../core/models/order.model';        

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:8080' 
});

@Injectable({ providedIn: 'root' })
export class Productservice {
  private http = inject(HttpClient);
  private baseUrl = inject(API_BASE_URL);

  getProductById(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/api/products/${id}`);
  }
}