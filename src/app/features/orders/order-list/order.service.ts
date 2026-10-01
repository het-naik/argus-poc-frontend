import { HttpClient } from "@angular/common/http";
import { inject, Injectable, InjectionToken } from "@angular/core";
import { Order, PaymentMethod } from "../../../core/models/order.model";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
    providedIn: 'root',
    factory: () => 'http://localhost:8080'
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
        return this.http.post<Order>(
            `${this.baseUrl}/orders/customer/${customerId}`,
            payload
        );
    }
}