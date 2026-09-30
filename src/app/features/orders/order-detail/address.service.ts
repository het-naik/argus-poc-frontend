import { inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../../../core/models/order.model';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
    providedIn: 'root',
    factory: () => 'http://localhost:8080'
});

@Injectable({ providedIn: 'root' })
export class Addressservice {
    private http = inject(HttpClient);
    private baseUrl = inject(API_BASE_URL);

    getAddressById(addressId: string) {
        return this.http.get<Address>(`${this.baseUrl}/customer/address/${addressId}`);
    }
}