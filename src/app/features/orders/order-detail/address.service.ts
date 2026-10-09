import { inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../../../core/models/order.model';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
    providedIn: 'root',
    factory: () => 'http://localhost:8080'
});

export interface AddressRequest {
    line_1: string;
    line_2?: string;
    line_3?: string;
    city: string;
    state: string;
    zipCode: string;
    customerId: string;
}

@Injectable({ providedIn: 'root' })
export class Addressservice {
    private http = inject(HttpClient);
    private baseUrl = inject(API_BASE_URL);

    getAddressById(addressId: string) {
        return this.http.get<Address>(`${this.baseUrl}/customer/address/${addressId}`);
    }
    getByCustomerId(customerId: string) {
        return this.http.get<Address[]>(`${this.baseUrl}/customer/address/get-all/${customerId}`);
    }
    addAddress(request: AddressRequest) {
        return this.http.post<Address>(`${this.baseUrl}/customer/address/add`, request);
    }
}