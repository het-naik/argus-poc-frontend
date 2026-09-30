import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../productservice';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Product } from '../../../core/interfaces/Product';

@Component({
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  selector: 'app-productdetails',
  styleUrl: './productdetails.scss',
  templateUrl: './productdetails.html',
})
export class Productdetails implements OnInit {

  product ?: Product;

  constructor(private route : ActivatedRoute, private router : Router, private productService : ProductService){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.productService.getProductById(id).subscribe((res) => this.product=res);
    }
  }

  addToCart() {
    console.log("Added to cart: ", this.product);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
