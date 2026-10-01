import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Product } from '../../../core/interfaces/product';
import { User } from '../../../core/interfaces/user';
import { Productservice } from '../../products/productservice';
import { ProductTable } from '../../../shared/components/product-table/product-table';
import { ProfileCard } from '../../../shared/components/profile-card/profile-card';
import { UserTable } from '../../../shared/components/user-table/user-table';
import { UserService } from '../../../shared/services/user-service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [MatTabsModule, ProductTable, UserTable, ProfileCard],
  styleUrl: './admin-dashboard.scss',
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard implements OnInit {
  private readonly productService = inject(Productservice);
  private readonly userService = inject(UserService);

  products = signal<Product[]>([]);
  users = signal<User[]>([]);

  ngOnInit() {
    this.productService.getProducts(0, 100).subscribe({
      next: (page) => this.products.set(page.content),
      error: (err) => console.error('Error fetching products', err),
    });

    this.userService.getAllUsers().subscribe({
      next: (page) => this.users.set(page.content),
      error: (err) => console.error('Error fetching users', err),
    });
  }

  onProductUpdated(updated: Product) {
    this.products.update((list) =>
      list.map((p) =>
        p.productId === updated.productId ? { ...updated, updatedAt: new Date() } : p,
      ),
    );
  }

  onUserUpdated(updated: User) {
    this.users.update((list) => list.map((u) => (u.id === updated.id ? updated : u)));
  }
}