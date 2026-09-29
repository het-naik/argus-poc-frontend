import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { getTotal, Order } from '../../../core/models/order.model';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order-list/order.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DecimalPipe } from '@angular/common';

@Component({
  imports: [MatCardModule,
    MatTableModule, DecimalPipe],
  selector: 'app-order-detail',
  styleUrl: './order-detail.scss',
  templateUrl: './order-detail.html',
})
export class OrderDetail implements OnInit {
  private orderService = inject(OrderService);
  private route = inject(ActivatedRoute)
  displayedColumns: string[] = ['image', 'name', 'price', 'quantity', 'subtotal'];


  order = signal<Order | null>(null);
  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id')
    if (orderId) {
      this.fetchDetails(orderId);
    }
  }
  total = computed(() => {
    const o = this.order();
    return o ? getTotal(o) : 0;
  });
  fetchDetails(id: string) {
    this.orderService.getById(id).subscribe(
      {
        next: (data: Order) => {
          this.order.set(data);
        }
      }
    )
  }
}
