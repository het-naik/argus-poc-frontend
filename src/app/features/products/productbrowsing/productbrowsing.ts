import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Productservice } from '../productservice';
import { Router } from '@angular/router';
import { CATEGORY_LABELS, CategoryType, formatCategory, Product } from '../../../core/interfaces/product';
import { CartService } from '../../cart/cart.service';
import { AuthService } from '../../auth/auth-service';
import { RoleType } from '../../../core/interfaces/user';



export interface CategoryFilter {
  value : CategoryType;
  label : string;
  checked : boolean;
}

export type SortOption = 'price-asc' | 'price-desc';


@Component({
  imports: [CommonModule, FormsModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatCardModule,
    MatCheckboxModule, MatRadioModule, MatSliderModule, MatDividerModule, MatPaginatorModule, MatBadgeModule, MatProgressSpinnerModule, MatSnackBarModule],
  selector: 'app-productbrowsing',
  styleUrl: './productbrowsing.scss',
  templateUrl: './productbrowsing.html',
})


export class Productbrowsing implements OnInit {

  formatCategory = formatCategory;

  constructor(private router : Router, private productService : Productservice, private cdr : ChangeDetectorRef, private cartService : CartService, private snackBar : MatSnackBar, private authService : AuthService){}

  searchTerm = '';

  sortOptions : {value : SortOption, label : String}[] = [
    {value : 'price-asc', label : 'Price: Low to High'},
    {value : 'price-desc', label : 'Price: High to Low'}
  ];

  selectedSort : SortOption = 'price-asc';

  categories : CategoryFilter[] = Object.values(CategoryType).map(type => ({
    value : type,
    label : CATEGORY_LABELS[type],
    checked : false,
  }));

  minPrice = 0;
  maxPrice = 5000;
  priceRangeLimit = 5000;

  inStockOnly = true;
  preOrderOnly = false;

  pageIndex = 0;
  pageSize = 10;

  products : Product[] = [];
  totalItems = 0;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProducts(this.pageIndex, this.pageSize).subscribe({
      next : (response) => {
        console.log('API response: ', response);
        console.log('Products array: ', response.content);
        const term = this.searchTerm.trim().toLowerCase();
        const selected = this.categories.filter(c => c.checked).map(c => c.value);
        const min = this.minPrice ?? 0;
        const max = this.maxPrice ?? Infinity;
        const filtered = response.content.filter(p => p.stock > 0)
        .filter(p => !term || p.name.toLowerCase().includes(term))
        .filter(p => selected.length === 0 || selected.includes(p.categoryType))
        .filter(p => p.pricePerUnit >= min && p.pricePerUnit <= max);
        this.products = filtered.sort((a, b) => 
          this.selectedSort === 'price-asc' ? a.pricePerUnit - b.pricePerUnit : b.pricePerUnit - a.pricePerUnit
        );
        this.totalItems = response.totalElements;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error : (err) => {
        console.log("Failed to fetch products: ", err);
        this.errorMessage = 'Could not load products';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSortChange() {
    this.pageIndex = 0;
    this.fetchProducts();
  }

  onPriceChange() {
    this.pageIndex = 0;
    this.fetchProducts();
    this.cdr.detectChanges();
  }

  onCategoryChange(category : CategoryFilter, checked : boolean) {
    category.checked = checked;
    this.pageIndex = 0;
    this.fetchProducts();
  }

  onSearchChange(value : string) : void {
    this.searchTerm = value;
    this.pageIndex = 0;
    this.fetchProducts();
    this.cdr.detectChanges();
  }


  onPageChange(event : PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchProducts();
  }

  resetFilters() {
    this.categories.forEach(c => c.checked = false);
    this.minPrice = 0;
    this.maxPrice = this.priceRangeLimit;
    this.inStockOnly = false;
    this.preOrderOnly = false;
    this.selectedSort = 'price-asc';
    this.pageIndex = 0;
    this.fetchProducts();
  }

  viewDetails(product : Product) {
    console.log("View Details: ", product);
    this.router.navigate(['/products', product.productId]);
  }

  showCartIcon() : boolean {
    const role = this.authService.getUser().role;
    return (role !== RoleType.SELLER && role !== RoleType.ADMIN);
  }

  goToCart() {
    const customerId = this.authService.getUser().id;
    this.router.navigate(['/carts/customer', customerId]);
  }

  addToCart(product : Product) {
    const customerId = this.authService.getUser().id;
    this.cartService.addToCart(customerId, product.productId, 1).subscribe({
      next : (cart) => {
        console.log("Added to cart: ", product);
        this.snackBar.open('Item successfully added to cart', 'Close', {
          duration : 3000,
          horizontalPosition : 'end',
          verticalPosition : 'top',
          panelClass : ['success-snackbar']
        });
      },
      error : (err) => {
        console.error("Failed to add to cart");
        this.snackBar.open('Failed to add item to cart', 'Close', {
          duration : 3000,
          horizontalPosition : 'end',
          verticalPosition : 'top',
          panelClass : ['error-snackbar']
        });
      }
    });
  }

}