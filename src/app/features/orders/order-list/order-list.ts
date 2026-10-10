import { Component, DestroyRef, computed, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, of } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

import { OrderService } from './order.service';
import { Order, OrderStatus, SellerOrder, getTotal } from '../../../core/models/order.model';
import { RoleType } from '../../../core/interfaces/user';
import { AuthService } from '../../auth/auth-service';
import { UpdateOrderStatusDialog } from '../../../shared/components/update-order-status-dialog/update-order-status-dialog';

@Component({
  selector: 'app-order-list',
  imports: [MatTableModule, MatButtonModule, CurrencyPipe, RouterLink, MatIcon],
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList implements OnInit {
  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private destroyRef = inject(DestroyRef);

  private role = this.authService.role();
  isAdmin = this.role === RoleType.ADMIN;
  isSeller = this.role === RoleType.SELLER;

  displayedColumns: string[] = this.isSeller
    ? [
        'orderId',
        'productName',
        'pricePerUnit',
        'units',
        'lineTotal',
        'paymentMethod',
        'status',
        'actions',
      ]
    : [
        'orderId',
        ...(this.isAdmin ? ['customerId'] : []),
        'orderItems',
        'total',
        'paymentMethod',
        'status',
      ];

  orders = signal<Order[]>([]);             
  sellerOrders = signal<SellerOrder[]>([]); 

  
  tableData = computed<any[]>(() => (this.isSeller ? this.sellerOrders() : this.orders()));

  ngOnInit() {
    const userId = this.authService.userId();

    if (this.isSeller) {
      if (!userId) return;
      this.orderService
        .getOrdersBySellerId(userId)
        .pipe(
          catchError((err) => {
            console.error('Failed to load seller orders', err);
            return of([] as SellerOrder[]);
          }),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe((rows) => this.sellerOrders.set(rows));
      return;
    }

    if (!this.isAdmin && !userId) return;

    const request$ = this.isAdmin
      ? this.orderService.getAll()
      : this.orderService.getByCustomerId(userId!);

    request$
      .pipe(
        map((response: any) => (response.content ?? response) as Order[]),
        catchError((err) => {
          console.error('Failed to load orders', err);
          return of([] as Order[]);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((orders) => this.orders.set(orders));
  }

  openStatusDialog(row: SellerOrder) {
    this.dialog
      .open(UpdateOrderStatusDialog, {
        data: { orderId: row.orderId, currentStatus: row.status },
      })
      .afterClosed()
      .subscribe((newStatus?: OrderStatus) => {
        if (!newStatus || newStatus === row.status) return;
        this.updateStatus(row.orderId, newStatus);
      });
  }

  private updateStatus(orderId: string, status: OrderStatus) {
    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: (updated) => {
        const finalStatus = updated?.status ?? status;
        
        this.sellerOrders.update((rows) =>
          rows.map((r) => (r.orderId === orderId ? { ...r, status: finalStatus } : r)),
        );
        this.snackBar.open(`Order #${orderId} marked ${finalStatus}`, 'OK', { duration: 3000 });
      },
      error: (err) => {
        console.error('Failed to update status', err);
        this.snackBar.open('Could not update order status', 'Dismiss', { duration: 4000 });
      },
    });
  }

  get rowCount(): number {
    return this.tableData().length;
  }

  countTotal(o: Order): number {
    return getTotal(o);
  }

  statusClass(status: string): string {
    return 'status-' + (status ?? 'unknown').toLowerCase();
  }
}