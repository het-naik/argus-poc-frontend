import { Component, inject } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { catchError, map, of } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

import { OrderService } from './order.service';
import { Order, getTotal } from '../../../core/models/order.model';
import { RoleType } from '../../../core/interfaces/user';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-order-list',
  imports: [MatTableModule, MatChipsModule, DecimalPipe, CurrencyPipe, RouterLink, MatIcon],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList {
  private orderService = inject(OrderService);
  private authService = inject(AuthService);


  isAdmin = this.authService.role() === RoleType.ADMIN;

  displayedColumns: string[] = [
    'orderId',
    ...(this.isAdmin ? ['customerId'] : []),
    'orderItems',
    'total',
    'paymentMethod',
    'status',
  ];

  orders = toSignal(this.loadOrders(), { initialValue: [] as Order[] });

  private loadOrders() {
    const customerId = this.authService.userId();

    if (!this.isAdmin && !customerId) {
      return of([] as Order[]);
    }

    const request$ = this.isAdmin
      ? this.orderService.getAll()
      : this.orderService.getByCustomerId(customerId!);

    return request$.pipe(
      map((response: any) => (response.content ?? response) as Order[]),
      catchError((err) => {
        console.error('Failed to load orders', err);
        return of([] as Order[]);
      }),
    );
  }

  countTotal(o: Order): number {
    return getTotal(o);
  }

  statusClass(status: string): string {
    return 'status-' + (status ?? 'unknown').toLowerCase();
  }
}