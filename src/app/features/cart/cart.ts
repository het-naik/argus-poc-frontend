import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from './cart.service';
import { Address, Cart, CartItem, PaymentMethod, Product } from '../../core/models/order.model';
import { MatRowDef, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatTableModule } from '@angular/material/table';
import { MatChip } from '@angular/material/chips';
import { MatCardActions, MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Productservice } from './product.service';
import { CurrencyPipe } from '@angular/common';
import { Addressservice } from '../orders/order-detail/address.service';
import { OrderService } from '../orders/order-list/order.service';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddAddressDialog } from './add-address-dialog/add-address-dialog';

@Component({
  imports: [MatTableModule, MatRowDef, RouterLink, CurrencyPipe, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatChip, MatCard, MatIconModule, MatRadioGroup, MatRadioButton, MatFormField, MatSelect, MatLabel, MatOption],
  selector: 'app-cart',
  styleUrl: './cart.scss',
  templateUrl: './cart.html',
})
export class CartComponent implements OnInit {
  displayedColumns = ['product', 'pricePerUnit', 'quantity', 'subtotal', 'actions'];
  private route = inject(ActivatedRoute)
  private router = inject(Router);
  private cartService = inject(CartService)
  private addressService = inject(Addressservice);
  private orderService = inject(OrderService)

  addresses = signal<Address[]>([]);
  selectedAddressId = signal<string | null>(null);
  selectedPayment = signal<PaymentMethod | null>(null);
  customerId = '';
  cart = signal<Cart | null>(null)
  private loadedForCustomer: string | null = null;

  paymentMethods: { value: PaymentMethod; label: string; }[] = [
    { value: 'CASH', label: 'Cash on Delivery'},
    { value: 'CARD', label: 'Credit / Debit Card'},
    { value: 'UPI', label: 'UPI'},
    { value: 'NET_BANKING', label: 'Net Banking' },
  ];
  
  constructor() {
    effect(() => {
      const customerId = this.cart()?.customerId;
      if (customerId && customerId !== this.loadedForCustomer) {
        this.loadedForCustomer = customerId;
      
      }
    });
  }

  private loadAddresses(customerId: string) {
    this.addressService.getByCustomerId(customerId).subscribe({
      next: (list) => {
        this.addresses.set(list);
        if (list.length === 1) this.selectedAddressId.set(list[0].addressId);
      },
      error: () => {
      },
    });
  }

  ngOnInit() {
    const customerId = this.route.snapshot.paramMap.get('id')
    if (customerId) {
      this.customerId = customerId;
      this.fetchDetails(customerId);
        this.loadAddresses(customerId);
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

  placeOrder() {
    const addressId = this.selectedAddressId();
    const paymentMethod = this.selectedPayment();
    if (!this.customerId || !addressId || !paymentMethod) return;
    this.orderService
      .placeOrder(this.customerId, {
        addressId,
        paymentMethod
      })
      .subscribe({
        next: (order) => this.router.navigate(['/orders', order.orderId]),
        error: (err) => console.error('Order failed', err),
      });
  }

  private dialog = inject(MatDialog);

openAddAddress() {
  this.dialog
    .open(AddAddressDialog, { data: { customerId: this.customerId }, width: '480px' })
    .afterClosed()
    .subscribe((created?: Address) => {
      if (!created) return;
      this.addresses.update((list) => [...list, created]);
      this.selectedAddressId.set(created.addressId);
    });
}
  //helper
  subtotal(item: CartItem): number {
    return item.pricePerUnit * item.quantity;
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