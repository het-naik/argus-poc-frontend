import { AfterViewInit, Component, effect, inject, signal, Signal, viewChild } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryType, formatCategory, Product } from '../../../core/interfaces/Product';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth/auth-service';
import { ProductEditDialog } from '../product-edit-dialog/product-edit-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CurrencyPipe,
    DatePipe,
  ],
  selector: 'app-seller-dashboard',
  styleUrl: './seller-dashboard.scss',
  templateUrl: './seller-dashboard.html',
})
export class SellerDashboard {
  products = signal<Product[]>([
    {
      productId: 'b0e5d1a8-c2b4-4e9f-8a1c-7d3f6e5b4a1a',
      name: 'product_name',
      description: 'Wireless Noise-Cancelling Over-Ear Headphones',
      pricePerUnit: 14999.0,
      stock: 45,
      categoryType: CategoryType.ELECTRONICS_TECHNOLOGY,
      productImageUrl:
        'https://cleverads.com.ph/blog/wp-content/uploads/2023/03/4p-in-tourism-marketing-product.jpg',
      createdAt: new Date('2026-01-15T08:30:00Z'),
      updatedAt: new Date('2026-03-10T14:22:00Z'),
      sellerId: 'f8e7d6c5-b4a3-2f1e-0d9c-8b7a6f5e4d3c', // References the seller from previous dummy data
    },
    {
      productId: 'c9a8b7d6-e5f4-3c2b-1a0f-9e8d7c6b5a4f',
      name: 'product_name',
      description: 'Classic Slim-Fit Denim Jacket - Vintage Wash',
      pricePerUnit: 3499.0,
      stock: 120,
      categoryType: CategoryType.FASHION_APPAREL,
      productImageUrl:
        'https://cleverads.com.ph/blog/wp-content/uploads/2023/03/4p-in-tourism-marketing-product.jpg',
      createdAt: new Date('2026-02-01T10:00:00Z'),
      updatedAt: new Date('2026-02-01T10:00:00Z'),
      sellerId: 'f8e7d6c5-b4a3-2f1e-0d9c-8b7a6f5e4d3c',
    },
    {
      productId: 'd5c4b3a2-1e0f-9a8b-7c6d-5e4f3a2b1c0d',
      name: 'product_name',
      description: 'Ergonomic Memory Foam Pillow for Side Sleepers',
      pricePerUnit: 2199.0,
      stock: 60,
      categoryType: CategoryType.HOME_LIVING,
      productImageUrl:
        'https://cleverads.com.ph/blog/wp-content/uploads/2023/03/4p-in-tourism-marketing-product.jpg',
      createdAt: new Date('2025-11-20T16:45:00Z'),
      updatedAt: new Date('2026-01-05T09:15:00Z'),
      sellerId: '2b4c6d8e-0f1a-3b5c-7d9e-1f2a3b4c5d6e',
    },
    {
      productId: 'e3f2a1b0-c9d8-7e6f-5a4b-3c2d1e0f9a8b',
      name: 'product_name',
      description: 'Hydrating Hyaluronic Acid Serum - 30ml',
      pricePerUnit: 899.0,
      stock: 250,
      categoryType: CategoryType.HEALTH_BEAUTY_PERSONAL_CARE,
      productImageUrl:
        'https://cleverads.com.ph/blog/wp-content/uploads/2023/03/4p-in-tourism-marketing-product.jpg',
      createdAt: new Date('2026-03-01T11:20:00Z'),
      updatedAt: new Date('2026-03-25T18:10:00Z'),
      sellerId: '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d',
    },
    {
      productId: 'fa1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d',
      name: 'product_name',
      description: 'Premium Organic Almonds - Raw & Unsalted (500g)',
      pricePerUnit: 650.0,
      stock: 500,
      categoryType: CategoryType.ESSENTIALS_FOOD_GROCERY,
      productImageUrl:
        'https://cleverads.com.ph/blog/wp-content/uploads/2023/03/4p-in-tourism-marketing-product.jpg',
      createdAt: new Date('2026-03-20T07:00:00Z'),
      updatedAt: new Date('2026-03-28T12:00:00Z'),
      sellerId: '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d',
    },
    {
      productId: '0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5e',
      name: 'product_name',
      description: 'Anti-Slip Natural Rubber Yoga Mat with Alignment Lines',
      pricePerUnit: 2799.0,
      stock: 35,
      categoryType: CategoryType.SPORTS_HOBBIES_LEISURE,
      productImageUrl:
        'https://cleverads.com.ph/blog/wp-content/uploads/2023/03/4p-in-tourism-marketing-product.jpg',
      createdAt: new Date('2025-12-10T14:00:00Z'),
      updatedAt: new Date('2026-02-18T10:30:00Z'),
      sellerId: 'f8e7d6c5-b4a3-2f1e-0d9c-8b7a6f5e4d3c',
    },{
      productId: 'b0e5d1a8-c2b4-4e9f-8a1c-7d3f6e5b4a1a',
      name: 'product_name',
      description: 'Wireless Noise-Cancelling Over-Ear Headphones',
      pricePerUnit: 14999.0,
      stock: 45,
      categoryType: CategoryType.ELECTRONICS_TECHNOLOGY,
      productImageUrl:
        'https://cleverads.com.ph/blog/wp-content/uploads/2023/03/4p-in-tourism-marketing-product.jpg',
      createdAt: new Date('2026-01-15T08:30:00Z'),
      updatedAt: new Date('2026-03-10T14:22:00Z'),
      sellerId: 'f8e7d6c5-b4a3-2f1e-0d9c-8b7a6f5e4d3c', // References the seller from previous dummy data
    },
    {
      productId: 'c9a8b7d6-e5f4-3c2b-1a0f-9e8d7c6b5a4f',
      name: 'product_name',
      description: 'Classic Slim-Fit Denim Jacket - Vintage Wash',
      pricePerUnit: 3499.0,
      stock: 120,
      categoryType: CategoryType.FASHION_APPAREL,
      productImageUrl:
        'https://cleverads.com.ph/blog/wp-content/uploads/2023/03/4p-in-tourism-marketing-product.jpg',
      createdAt: new Date('2026-02-01T10:00:00Z'),
      updatedAt: new Date('2026-02-01T10:00:00Z'),
      sellerId: 'f8e7d6c5-b4a3-2f1e-0d9c-8b7a6f5e4d3c',
    },
    {
      productId: 'd5c4b3a2-1e0f-9a8b-7c6d-5e4f3a2b1c0d',
      name: 'product_name',
      description: 'Ergonomic Memory Foam Pillow for Side Sleepers',
      pricePerUnit: 2199.0,
      stock: 60,
      categoryType: CategoryType.HOME_LIVING,
      productImageUrl:
        'https://cleverads.com.ph/blog/wp-content/uploads/2023/03/4p-in-tourism-marketing-product.jpg',
      createdAt: new Date('2025-11-20T16:45:00Z'),
      updatedAt: new Date('2026-01-05T09:15:00Z'),
      sellerId: '2b4c6d8e-0f1a-3b5c-7d9e-1f2a3b4c5d6e',
    },
    {
      productId: 'e3f2a1b0-c9d8-7e6f-5a4b-3c2d1e0f9a8b',
      name: 'product_name',
      description: 'Hydrating Hyaluronic Acid Serum - 30ml',
      pricePerUnit: 899.0,
      stock: 250,
      categoryType: CategoryType.HEALTH_BEAUTY_PERSONAL_CARE,
      productImageUrl:
        'https://cleverads.com.ph/blog/wp-content/uploads/2023/03/4p-in-tourism-marketing-product.jpg',
      createdAt: new Date('2026-03-01T11:20:00Z'),
      updatedAt: new Date('2026-03-25T18:10:00Z'),
      sellerId: '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d',
    },
    {
      productId: 'fa1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d',
      name: 'product_name',
      description: 'Premium Organic Almonds - Raw & Unsalted (500g)',
      pricePerUnit: 650.0,
      stock: 500,
      categoryType: CategoryType.ESSENTIALS_FOOD_GROCERY,
      productImageUrl:
        'https://cleverads.com.ph/blog/wp-content/uploads/2023/03/4p-in-tourism-marketing-product.jpg',
      createdAt: new Date('2026-03-20T07:00:00Z'),
      updatedAt: new Date('2026-03-28T12:00:00Z'),
      sellerId: '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d',
    },
    {
      productId: '0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5e',
      name: 'product_name',
      description: 'Anti-Slip Natural Rubber Yoga Mat with Alignment Lines',
      pricePerUnit: 2799.0,
      stock: 35,
      categoryType: CategoryType.SPORTS_HOBBIES_LEISURE,
      productImageUrl:
        'https://cleverads.com.ph/blog/wp-content/uploads/2023/03/4p-in-tourism-marketing-product.jpg',
      createdAt: new Date('2025-12-10T14:00:00Z'),
      updatedAt: new Date('2026-02-18T10:30:00Z'),
      sellerId: 'f8e7d6c5-b4a3-2f1e-0d9c-8b7a6f5e4d3c',
    },{
      productId: 'b0e5d1a8-c2b4-4e9f-8a1c-7d3f6e5b4a1a',
      name: 'product_name',
      description: 'Wireless Noise-Cancelling Over-Ear Headphones',
      pricePerUnit: 14999.0,
      stock: 45,
      categoryType: CategoryType.ELECTRONICS_TECHNOLOGY,
      productImageUrl:
        'https://cleverads.com.ph/blog/wp-content/uploads/2023/03/4p-in-tourism-marketing-product.jpg',
      createdAt: new Date('2026-01-15T08:30:00Z'),
      updatedAt: new Date('2026-03-10T14:22:00Z'),
      sellerId: 'f8e7d6c5-b4a3-2f1e-0d9c-8b7a6f5e4d3c', // References the seller from previous dummy data
    },
    {
      productId: 'c9a8b7d6-e5f4-3c2b-1a0f-9e8d7c6b5a4f',
      name: 'product_name',
      description: 'Classic Slim-Fit Denim Jacket - Vintage Wash',
      pricePerUnit: 3499.0,
      stock: 120,
      categoryType: CategoryType.FASHION_APPAREL,
      productImageUrl:
        'https://cleverads.com.ph/blog/wp-content/uploads/2023/03/4p-in-tourism-marketing-product.jpg',
      createdAt: new Date('2026-02-01T10:00:00Z'),
      updatedAt: new Date('2026-02-01T10:00:00Z'),
      sellerId: 'f8e7d6c5-b4a3-2f1e-0d9c-8b7a6f5e4d3c',
    },
    {
      productId: 'd5c4b3a2-1e0f-9a8b-7c6d-5e4f3a2b1c0d',
      name: 'product_name',
      description: 'Ergonomic Memory Foam Pillow for Side Sleepers',
      pricePerUnit: 2199.0,
      stock: 60,
      categoryType: CategoryType.HOME_LIVING,
      productImageUrl:
        'https://cleverads.com.ph/blog/wp-content/uploads/2023/03/4p-in-tourism-marketing-product.jpg',
      createdAt: new Date('2025-11-20T16:45:00Z'),
      updatedAt: new Date('2026-01-05T09:15:00Z'),
      sellerId: '2b4c6d8e-0f1a-3b5c-7d9e-1f2a3b4c5d6e',
    },
    {
      productId: 'e3f2a1b0-c9d8-7e6f-5a4b-3c2d1e0f9a8b',
      name: 'product_name',
      description: 'Hydrating Hyaluronic Acid Serum - 30ml',
      pricePerUnit: 899.0,
      stock: 250,
      categoryType: CategoryType.HEALTH_BEAUTY_PERSONAL_CARE,
      productImageUrl:
        'https://cleverads.com.ph/blog/wp-content/uploads/2023/03/4p-in-tourism-marketing-product.jpg',
      createdAt: new Date('2026-03-01T11:20:00Z'),
      updatedAt: new Date('2026-03-25T18:10:00Z'),
      sellerId: '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d',
    },
    {
      productId: 'fa1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d',
      name: 'product_name',
      description: 'Premium Organic Almonds - Raw & Unsalted (500g)',
      pricePerUnit: 650.0,
      stock: 500,
      categoryType: CategoryType.ESSENTIALS_FOOD_GROCERY,
      productImageUrl:
        'https://cleverads.com.ph/blog/wp-content/uploads/2023/03/4p-in-tourism-marketing-product.jpg',
      createdAt: new Date('2026-03-20T07:00:00Z'),
      updatedAt: new Date('2026-03-28T12:00:00Z'),
      sellerId: '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d',
    },
    {
      productId: '0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5e',
      name: 'product_name',
      description: 'Anti-Slip Natural Rubber Yoga Mat with Alignment Lines',
      pricePerUnit: 2799.0,
      stock: 35,
      categoryType: CategoryType.SPORTS_HOBBIES_LEISURE,
      productImageUrl:
        'https://cleverads.com.ph/blog/wp-content/uploads/2023/03/4p-in-tourism-marketing-product.jpg',
      createdAt: new Date('2025-12-10T14:00:00Z'),
      updatedAt: new Date('2026-02-18T10:30:00Z'),
      sellerId: 'f8e7d6c5-b4a3-2f1e-0d9c-8b7a6f5e4d3c',
    }
  ]);

  displayedColumns: string[] = [
    'productImageUrl',
    'name',
    'description',
    'categoryType',
    'pricePerUnit',
    'stock',
    'createdAt',
    'updatedAt',
  ];

  dataSource = new MatTableDataSource<Product>([]);

  paginator = viewChild.required(MatPaginator);
  sort = viewChild.required(MatSort);
  private formatCategory = formatCategory; 
  private CategoryType = CategoryType;

  private readonly dialog = inject(MatDialog);

  constructor(private authService: AuthService) {
    effect(() => {
      this.dataSource.data = this.products();
    });
    this.dataSource.filterPredicate = (p: Product, filter: string) =>
      `${p.name} ${p.description} ${formatCategory(p.categoryType)} ${p.pricePerUnit} ${p.stock}`
        .toLowerCase()
        .includes(filter);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator();
    this.dataSource.sort = this.sort();
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }


  openEditDialog(product: Product) {
    this.dialog
      .open<ProductEditDialog, Product, Product>(ProductEditDialog, {
        width: '520px',
        data: product,
        autoFocus: 'first-tabbable',
      })
      .afterClosed()
      .subscribe((updated) => {
        if (!updated) return;

        this.products.update((list) =>
          list.map((p) =>
            p.productId === updated.productId ? { ...updated, updatedAt: new Date() } : p,
          ),
        );
      });
  }
}
