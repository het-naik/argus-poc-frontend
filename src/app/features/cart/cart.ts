import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from './cart.service';
import { Cart, CartItem, Product } from '../../core/models/order.model';
import { MatRowDef, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatTableModule } from '@angular/material/table';
import { MatChip } from '@angular/material/chips';
import { MatCardActions, MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Productservice } from './product.service';

@Component({
  imports: [MatTableModule, MatRowDef, RouterLink, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatChip, MatCard, MatIconModule],
  selector: 'app-cart',
  styleUrl: './cart.scss',
  templateUrl: './cart.html',
})
export class CartComponent implements OnInit {
  displayedColumns = ['product', 'pricePerUnit', 'quantity', 'subtotal','actions'];
  private route = inject(ActivatedRoute)
  private cartService = inject(CartService)
  private productService = inject(Productservice)
    customerId = ''; 
  cart = signal<Cart | null>(null)
  prices = signal<Record<number, number>>({});

  ngOnInit() {
    const customerId = this.route.snapshot.paramMap.get('id')
    if (customerId) {
      this.customerId=customerId;
      this.fetchDetails(customerId);
    }
  }
  fetchDetails(customerId: string) {
    console.log('Fetching cart for', customerId);
    this.cartService.getCart(customerId).subscribe({
      next: (data: Cart) => {
        console.log('Cart response', data);
        this.cart.set(data);
        data.cartItems.forEach(item => this.loadPrice(item.productId));
      },
      error: (err) => console.error('Cart error', err),
    });
  }

  loadPrice(productId: number) {
    console.log('Loading price for', productId);
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        console.log('Product response', product);
        this.prices.update(p => ({ ...p, [productId]: product.pricePerUnit }));
      },
      error: (err) => console.error('Product error', productId, err),
    });
  }

  removeItem(item: CartItem) {
    if (!confirm('Remove this item from your cart?')) return;
    this.cartService.removeItem(this.customerId, item.productId).subscribe({
      next: () => {
        this.cart.update(c =>
          c ? { ...c, cartItems: c.cartItems.filter(i => i.productId !== item.productId) } : c
        );
      },
      error: (err) => console.error('Remove item error', err),
    });
  }

  //helper
  priceOf(item: CartItem): number {
    return this.prices()[item.productId] ?? 0;
  }

  subtotal(item: CartItem): number {
    return this.priceOf(item) * item.quantity;
  }
  itemCount = computed(() => this.cart()?.cartItems.reduce((sum, i) => sum + i.quantity, 0));

  total = computed(() =>
    (this.cart()?.cartItems ?? []).reduce((sum, i) => sum + this.subtotal(i), 0)
  );

  increment(item: CartItem) {
    this.changeQuantity(item, item.quantity + 1);
  }

  decrement(item: CartItem) {
    if (item.quantity <= 1) return;
    this.changeQuantity(item, item.quantity - 1);
  }
    clearCart() {
    if (!confirm('Delete your entire cart?')) return;
    this.cartService.deleteCart(this.customerId).subscribe({
      next: () => this.cart.set(null),
      error: (err) => console.error('Delete cart error', err),
    });
  }
    private changeQuantity(item: CartItem, quantity: number) {
    this.cartService.updateQuantity(this.customerId, item.productId, quantity).subscribe({
      next: () => this.setLocalQuantity(item.productId, quantity),
      error: (err) => console.error('Update quantity error', err),
    });
  }
    private setLocalQuantity(productId: number, quantity: number) {
    this.cart.update(c =>
      c ? { ...c, cartItems: c.cartItems.map(i => i.productId === productId ? { ...i, quantity } : i) } : c
    );
  }
}
