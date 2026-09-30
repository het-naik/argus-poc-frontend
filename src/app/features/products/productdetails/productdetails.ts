import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Productservice } from '../productservice';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { formatCategory, Product } from '../../../core/interfaces/Product';

@Component({
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatProgressSpinnerModule],
  selector: 'app-productdetails',
  styleUrl: './productdetails.scss',
  templateUrl: './productdetails.html',
})
export class Productdetails implements OnInit {

  formatCategory = formatCategory;

  product ?: Product;
  isLoading = true;
  errorMessage = '';

  constructor(private route : ActivatedRoute, private router : Router, private productService : Productservice, private cdr : ChangeDetectorRef){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(!id) {
      this.isLoading = false;
      this.errorMessage = 'No product Id provided';
      return;
    }
    this.productService.getProductById(id).subscribe({
      next : (product) => {
        this.product = product;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error : (err) => {
        console.error("Failed to fetch product", err);
        this.errorMessage = 'Product not found';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  addToCart() {
    console.log("Added to cart: ", this.product);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
