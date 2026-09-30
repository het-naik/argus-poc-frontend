import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { map, of, switchMap } from 'rxjs';

import { OrderService } from './order.service';
import { Order,getTotal } from '../../../core/models/order.model';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-order-list',
  imports: [MatTableModule, MatChipsModule, DecimalPipe, RouterLink, MatIcon],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList {

  private orderService = inject(OrderService);

    // we need to get from authenticated user
  isAdmin=true;
  //we need to get logged in customer
   private customer ={
  "id": "210a317b-9627-4a82-abfe-1e0558e78bfc",
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "securePass2026",
  "role": "CUSTOMER"
};
//benefit is automatically subscribes and unsubscribes to data by signal
//swictch map helps to avoid emmory leaks and instantaneour event by user are deleted
orders = toSignal(
    of(this.isAdmin).pipe(
      switchMap((admin) => {
        if (admin) {
          return this.orderService.getAll();
        } else {
        
          const customerId = this.customer.id; 
          return this.orderService.getByCustomerId(customerId);
        }
      }),
      map((response: any) => (response.content ?? response) as Order[])
    ),
    { initialValue: [] as Order[] }
  );

  displayedColumns: string[] = [
    'orderId',
   ...(this.isAdmin ? ['customerId'] : []),
    'orderItems',
    'total',
    'paymentMethod',
    'status',
  ];
  countTotal(o:Order):number{
    return getTotal(o);
  }
    statusClass(status: string): string {
    return 'status-' + (status ?? 'unknown').toLowerCase();
  }
}