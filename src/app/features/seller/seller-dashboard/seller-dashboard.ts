import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../core/interfaces/product';
import { AuthService } from '../../auth/auth-service';
import { ProductTable } from '../../../shared/components/product-table/product-table';
import { ProfileCard } from '../../../shared/components/profile-card/profile-card';
import { Productservice } from '../../products/productservice';
import {
  ProductAddDialog,
  ProductAddDialogData,
} from '../../../features/seller/add-product-dialog/add-product-dialog';

@Component({
  selector: 'app-seller-dashboard',
  imports: [ProductTable, ProfileCard, MatButtonModule],
  styleUrl: './seller-dashboard.scss',
  templateUrl: './seller-dashboard.html',
})
export class SellerDashboard implements OnInit {
  products = signal<Product[]>([]);

  constructor(
    private authService: AuthService,
    private productService: Productservice,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {
    this.productService.getProducts(0, 10).subscribe({
      next: (page) => this.products.set(page.content),
      error: (err) => console.error('Error fetching products', err),
    });
  }

  openAddDialog() {
    const data: ProductAddDialogData = {
      sellerId: this.authService.getUser()!.id,
    };

    this.dialog
      .open(ProductAddDialog, { data, width: '560px' })
      .afterClosed()
      .subscribe((created?: Product) => {
        if (created) this.loadProducts();
      });
  }

  onProductUpdated(updated: Product) {
    this.products.update((list) =>
      list.map((p) =>
        p.productId === updated.productId ? { ...updated, updatedAt: new Date() } : p,
      ),
    );
  }
}