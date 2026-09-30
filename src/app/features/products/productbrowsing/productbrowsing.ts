import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { Productservice } from '../productservice';
import { CategoryType, CATEGORY_LABELS, Product } from '../../../core/interfaces/Product';
import { Page } from '../../../core/interfaces/Page';
import { Observable } from 'rxjs';

export interface CategoryFilter {
  type: CategoryType;
  label: string;
  checked: boolean;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

const SORT_PARAMS: Record<SortOption, string | undefined> = {
  featured: undefined, // backend default: pricePerUnit
  'price-asc': 'pricePerUnit,asc',
  'price-desc': 'pricePerUnit,desc',
  newest: 'createdAt,desc',
};

@Component({
  selector: 'app-productbrowsing',
  imports: [
    CommonModule, FormsModule, MatToolbarModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatRadioModule,
    MatSliderModule, MatDividerModule, MatPaginatorModule, MatBadgeModule,
  ],
  styleUrl: './productbrowsing.scss',
  templateUrl: './productbrowsing.html',
})
export class Productbrowsing implements OnInit {
  private readonly router = inject(Router);
  private readonly productService = inject(Productservice);

  private loadedProducts: Product[] = [];
  products = signal<Product[]>([]);
  totalItems = signal(0);
  loading = signal(false);

  searchTerm = '';
  cartCount = 1;

  sortOptions: { value: SortOption; label: string }[] = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest arrival' },
  ];
  selectedSort: SortOption = 'featured';

  categories: CategoryFilter[] = (Object.values(CategoryType) as CategoryType[]).map((type) => ({
    type,
    label: CATEGORY_LABELS[type],
    checked: false,
  }));

  minPrice = 0;
  maxPrice = 5000;
  priceRangeLimit = 5000;

  inStockOnly = false;

  pageIndex = 0;
  pageSize = 10;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);
    const sort = SORT_PARAMS[this.selectedSort];
    const selected = this.categories.filter((c) => c.checked);

    // Backend filters by one category at a time; otherwise fetch all and filter here.
    const request$: Observable<Page<Product>> =
      selected.length === 1
        ? this.productService.getProductsByCategory(selected[0].type, this.pageIndex, this.pageSize, sort)
        : this.productService.getProducts(this.pageIndex, this.pageSize, sort);

    request$.subscribe({
      next: (res) => {
        this.loadedProducts = res.content;
        this.totalItems.set(res.totalElements);
        this.applyClientFilters();
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  // Filters the backend doesn't support run on the current page.
  applyClientFilters() {
    const selected = this.categories.filter((c) => c.checked).map((c) => c.type);
    const term = this.searchTerm.trim().toLowerCase();

    this.products.set(
      this.loadedProducts.filter(
        (p) =>
          p.pricePerUnit >= this.minPrice &&
          p.pricePerUnit <= this.maxPrice &&
          (!this.inStockOnly || p.stock > 0) &&
          (selected.length <= 1 || selected.includes(p.categoryType)) &&
          (!term || p.name.toLowerCase().includes(term)),
      ),
    );
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  onSortChange() {
    this.pageIndex = 0;
    this.loadProducts();
  }

  onCategoryChange() {
    this.pageIndex = 0;
    this.loadProducts();
  }

  resetFilters() {
    this.categories.forEach((c) => (c.checked = false));
    this.minPrice = 0;
    this.maxPrice = this.priceRangeLimit;
    this.inStockOnly = false;
    this.searchTerm = '';
    this.selectedSort = 'featured';
    this.pageIndex = 0;
    this.loadProducts();
  }

  viewDetails(product: Product) {
    this.router.navigate(['/products', product.productId]);
  }

  addToCart(product: Product) {
    this.cartCount++;
    console.log('Added to cart: ', product);
  }
}