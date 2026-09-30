import { Component, signal } from '@angular/core';
import { Product } from '../../../core/interfaces/Product';
import { AuthService } from '../../auth/auth-service';
import { ProductTable } from '../../../shared/components/product-table/product-table';
import { ProfileCard } from '../../../shared/components/profile-card/profile-card';

@Component({
  selector: 'app-seller-dashboard',
  imports: [ProductTable, ProfileCard],
  styleUrl: './seller-dashboard.scss',
  templateUrl: './seller-dashboard.html',
})
export class SellerDashboard {
  products = signal<Product[]>([]);

  constructor(private authService: AuthService) {}

  onProductUpdated(updated: Product) {
    this.products.update((list) =>
      list.map((p) =>
        p.productId === updated.productId ? { ...updated, updatedAt: new Date() } : p,
      ),
    );
  }
}