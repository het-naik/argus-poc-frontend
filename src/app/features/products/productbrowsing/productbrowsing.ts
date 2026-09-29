import { Component } from '@angular/core';
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
import { Product, Productservice } from '../productservice';
import { Router } from '@angular/router';



export interface CategoryFilter {
  label : string;
  checked : boolean;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';


@Component({
  imports: [CommonModule, FormsModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatCardModule,
    MatCheckboxModule, MatRadioModule, MatSliderModule, MatDividerModule, MatPaginatorModule, MatBadgeModule],
  selector: 'app-productbrowsing',
  styleUrl: './productbrowsing.scss',
  templateUrl: './productbrowsing.html',
})


export class Productbrowsing {

  products : Product[] = [];

  constructor(private router : Router, private productService : Productservice){
    this.products = this.productService.getProducts();
  }

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

  totalItems = 6;

  pageIndex = 0;
  pageSize = 10;

  onPageChange(event : PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  resetFilters() {
    this.categories.forEach(c => c.checked = false);
    this.minPrice = 0;
    this.maxPrice = this.priceRangeLimit;
    this.inStockOnly = false;
    this.preOrderOnly = false;
    this.selectedSort = 'featured';
  }

  viewDetails(product : Product) {
    console.log("View Details: ", product);
    this.router.navigate(['/products', product.id]);
  }

  addToCart(product : Product) {
    this.cartCount++;
    console.log("Added to cart: ", product)
  }

}
