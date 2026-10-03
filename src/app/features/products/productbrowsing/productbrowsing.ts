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
import { Productservice } from '../productservice';
import { Router } from '@angular/router';
import { formatCategory, Product } from '../../../core/interfaces/product';
import { CartService } from '../../cart/cart.service';



export interface CategoryFilter {
  label : string;
  checked : boolean;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';


@Component({
  imports: [CommonModule, FormsModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatCardModule,
    MatCheckboxModule, MatRadioModule, MatSliderModule, MatDividerModule, MatPaginatorModule, MatBadgeModule, MatProgressSpinnerModule],
  selector: 'app-productbrowsing',
  styleUrl: './productbrowsing.scss',
  templateUrl: './productbrowsing.html',
})


export class Productbrowsing implements OnInit {

  formatCategory = formatCategory;

  constructor(private router : Router, private productService : Productservice, private cdr : ChangeDetectorRef, private cartService : CartService){}

  searchTerm = '';

  cartCount = 1;

  sortOptions : {value : SortOption, label : String}[] = [
    {value : 'featured', label : 'Featured'},
    {value : 'price-asc', label : 'Price: Low to High'},
    {value : 'price-desc', label : 'Price: High to Low'},
    {value : 'newest', label : 'Newest arrival'},
  ];

  selectedSort : SortOption = 'featured';

  categories : CategoryFilter[] = [
    {label : 'Fashion & Apparel', checked : true},
    {label : 'Electronics', checked : false},
    {label : 'Health & Beauty', checked : false},
    {label : 'Food', checked : false},
  ];

  minPrice = 0;
  maxPrice = 5000;
  priceRangeLimit = 1000;

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
        this.products = response.content;
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
    this.selectedSort = 'featured';
    this.pageIndex = 0;
    this.fetchProducts();
  }

  viewDetails(product : Product) {
    console.log("View Details: ", product);
    this.router.navigate(['/products', product.productId]);
  }

  goToCart() {
    this.router.navigate(['/carts/customer/9d6f2130-97ba-4791-a943-019a5f07f1b8'])
  }

  addToCart(product : Product) {
    this.cartService.addToCart('9d6f2130-97ba-4791-a943-019a5f07f1b8', product.productId, 1).subscribe({
      next : (cart) => {
        this.cartCount++;
        console.log("Added to cart: ", product);
      },
      error : (err) => {
        console.error("Failed to add to cart");
      }
    });
  }

}