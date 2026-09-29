import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from './cart.service';
import { Cart, CartItem } from '../../core/models/order.model';
import { MatRowDef, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatTableModule } from '@angular/material/table';
import { MatChip } from '@angular/material/chips';
import { MatCardActions, MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatTableModule, MatRowDef, RouterLink, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatChip, MatCardActions, MatCard,MatIconModule],
  selector: 'app-cart',
  styleUrl: './cart.scss',
  templateUrl: './cart.html',
})
export class CartComponent implements OnInit {
  displayedColumns = ['product', 'pricePerUnit', 'quantity', 'subtotal'];
  private route = inject(ActivatedRoute)
  private cartService = inject(CartService)

  cart = signal<Cart | null>(null)
  ngOnInit() {
    const customerId = this.route.snapshot.paramMap.get('id')
    if (customerId) {
      this.fetchDetails(customerId);
    }
  }
  fetchDetails(customerId: string) {
    console.log('Fetching cart for', customerId);
    this.cartService.getCart(customerId).subscribe({
      next: (data: Cart) => {
        console.log('Cart response', data);
        this.cart.set(data);
      },
      error: (err) => console.error('Cart error', err),
    });
  }
  increment(item: CartItem) {
    this.update(item, item.quantity + 1);
  }
  decrement(item: CartItem) {
    if (item.quantity <= 1) return;
    this.update(item, item.quantity - 1);
  }
  update(item: CartItem, quantity: number) {
    this.cart.update(c =>
      c ? { ...c, cartItems: c.cartItems.map(i => (i.id === item.id ? { ...i, quantity } : i)) } : c
    );
  }
}
