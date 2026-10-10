import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { Order, OrderStatus, PaymentMethod, SellerOrder } from '../../../core/models/order.model';
import { Observable } from 'rxjs';
import {
  SalesByCategoryResponse,
  TopProductsByCategoryResponse,
  TotalSalesResponse,
} from '../../../core/interfaces/analytics';
import { Product } from '../../../core/interfaces/product';
import { User } from '../../../core/interfaces/user';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:8080',
});

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private baseUrl = inject(API_BASE_URL);
  getAll() {
    return this.http.get<Order[]>(`${this.baseUrl}/orders`);
  }
  getById(id: string) {
    return this.http.get<Order>(`${this.baseUrl}/orders/${id}`);
  }
  getByCustomerId(id: string) {
    return this.http.get<Order[]>(`${this.baseUrl}/orders/customer/${id}`);
  }
  placeOrder(customerId: string, payload: { addressId: string; paymentMethod: PaymentMethod }) {
    return this.http.post<Order>(`${this.baseUrl}/orders/customer/${customerId}`, payload);
  }

  getOrdersBySellerId(sellerId: string) {
    return this.http.get<SellerOrder[]>(`${this.baseUrl}/orders/seller/${sellerId}`);
  }

  getTotalSales(): Observable<TotalSalesResponse> {
    return this.http.get<TotalSalesResponse>(`${this.baseUrl}/orders/sales/total`);
  }

  getMostSoldProduct(): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/orders/products/most-sold`);
  }

  getTotalSalesByCategory(): Observable<SalesByCategoryResponse> {
    return this.http.get<SalesByCategoryResponse>(`${this.baseUrl}/orders/sales/category`);
  }

  getTopProductsByCategory(): Observable<TopProductsByCategoryResponse> {
    return this.http.get<TopProductsByCategoryResponse>(
      `${this.baseUrl}/orders/products/most-sold/category`,
    );
  }

  getTopSellers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/orders/topsellers`);
  }

  updateOrderStatus(orderId: string, status: OrderStatus) {
    return this.http.patch<Order>(`${this.baseUrl}/orders/${orderId}/status`, { status });
}
}
