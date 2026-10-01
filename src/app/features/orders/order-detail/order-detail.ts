import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Address, getTotal, Order } from '../../../core/models/order.model';
import { OrderService } from '../order-list/order.service';
import { Addressservice } from './address.service';
import { Productservice } from '../../cart/product.service';

@Component({
  selector: 'app-order-detail',
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, CurrencyPipe, RouterLink],
  styleUrl: './order-detail.scss',
  templateUrl: './order-detail.html',
})
export class OrderDetail implements OnInit {
  private orderService = inject(OrderService);
  private addressService = inject(Addressservice);
  private route = inject(ActivatedRoute);
  address = signal<Address | null>(null);

  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'subtotal'];

  order = signal<Order | null>(null);

  total = computed(() => {
    const o = this.order();
    return o ? getTotal(o) : 0;
  });

  itemCount = computed(() =>
    (this.order()?.orderItems ?? []).reduce((sum: number, i: any) => sum + (i.quantity ?? 0), 0)
  );

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.fetchDetails(orderId);
    }
  }

  fetchDetails(id: string) {
    this.orderService.getById(id).subscribe({
      next: (data: Order) => 
        {this.order.set(data),
                this.loadAddress(data.addressId)
        }
    });
  }
  private loadAddress(addressId: string) {
  this.addressService.getAddressById(addressId).subscribe({
    next: (a) => this.address.set(a),
    error: (err) => console.error('Address error', err),
  })
}
  statusClass(status?: string): string {
    return 'status-' + (status ?? 'unknown').toLowerCase();
  }
}