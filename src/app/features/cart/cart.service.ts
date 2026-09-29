import { HttpClient } from "@angular/common/http";
import { inject, Injectable, InjectionToken } from "@angular/core";
import { Cart } from "../../core/models/order.model";



export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:8080' 
});

@Injectable({providedIn:'root'})
export class CartService{
    private http=inject(HttpClient);
    private baseUrl=inject(API_BASE_URL);
    // deleteCart(){

    // }
    getCart(id:string){
        return this.http.get<Cart>(`${this.baseUrl}/carts/customer/${id}`);
    }
}