import { HttpClient } from "@angular/common/http";
import { inject, Injectable, InjectionToken } from "@angular/core";
import { Cart } from "../../core/models/order.model";

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
    providedIn: 'root',
    factory: () => 'http://localhost:8080'
});

@Injectable({ providedIn: 'root' })
export class CartService {
    private http = inject(HttpClient);
    private baseUrl = inject(API_BASE_URL);
    getCart(id: string) {
        return this.http.get<Cart>(`${this.baseUrl}/carts/customer/${id}`);
    }
    removeItem(customerId: string, productId: number) {
        return this.http.delete<Cart>(`${this.baseUrl}/carts/customer/${customerId}/items/${productId}`);
    }
    deleteCart(customerId: string) {
        return this.http.delete<void>(`${this.baseUrl}/carts/customer/${customerId}`);
    }
    updateQuantity(customerId: string, productId: number, quantity: number) {
        return this.http.patch<Cart>(
            `${this.baseUrl}/carts/customer/${customerId}/items/${productId}`,
            { quantity }
        );
    }
}