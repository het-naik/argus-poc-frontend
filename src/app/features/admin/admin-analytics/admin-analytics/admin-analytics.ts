import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderService } from '../../../orders/order-list/order.service';
import { CategoryType, formatCategory, Product } from '../../../../core/interfaces/product';
import { User } from '../../../../core/interfaces/user';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [CommonModule, MatCardModule, MatListModule, MatChipsModule, MatDividerModule, MatIconModule],
  selector: 'app-admin-analytics',
  styleUrl: './admin-analytics.scss',
  templateUrl: './admin-analytics.html',
})
export class AdminAnalytics implements OnInit {

  constructor(private orderService : OrderService, private cdr : ChangeDetectorRef) {}

  formatCategory = formatCategory;

  totalSales = 0;
  totalSalesError = '';

  mostSoldProduct : Product | null = null;
  mostSoldProductError = '';

  salesByCategory : {category : CategoryType, total : number}[] = [];
  salesByCategoryError = '';

  topProductsByCategory : {category : CategoryType, products : Product[]}[] = [];
  topProductsByCategoryError = '';

  topSellers : User[] = [];
  topSellersError = '';

  ngOnInit(): void {
    this.fetchTotalSales();
    this.fetchMostSoldProduct();
    this.fetchSalesByCategory();
    this.fetchTopProductsByCategory();
    this.fetchTopSellers();
  }

  fetchTotalSales() {
    this.totalSalesError = '';

    this.orderService.getTotalSales().subscribe({
      next : (response) => {
        const values = Object.values(response);
        this.totalSales = values.length > 0 ? values[0] : 0;
        this.cdr.detectChanges();
      },
      error : (err) => {
        console.error('Failed to fetch total sales: ', err);
        this.totalSalesError = 'Could not load total sales';
        this.cdr.detectChanges();
      }
    });
  }

  fetchMostSoldProduct() {
    this.mostSoldProductError = '';

    this.orderService.getMostSoldProduct().subscribe({
      next : (product) => {
        this.mostSoldProduct = product;
        this.cdr.detectChanges();
      },
      error : (err) => {
        console.error('Failed to fetch most sold product: ', err);
        this.totalSalesError = 'No data available';
        this.cdr.detectChanges();
      }
    });
  }

  fetchSalesByCategory() {
    this.salesByCategoryError = '';

    this.orderService.getTotalSalesByCategory().subscribe({
      next : (response) => {
        this.salesByCategory = Object.entries(response).map(([category, total]) => ({
          category : category as CategoryType,
          total : total as number
        }));
        this.cdr.detectChanges();
      },
      error : (err) => {
        console.error('Failed to fetch sales by category: ', err);
        this.totalSalesError = 'Could not load category-wise sales';
        this.cdr.detectChanges();
      }
    });
  }

  fetchTopProductsByCategory() {
    this.topProductsByCategoryError = '';

    this.orderService.getTopProductsByCategory().subscribe({
      next : (response) => {
        this.topProductsByCategory = Object.entries(response).map(([category, products]) => ({
          category : category as CategoryType,
          products : products as Product[]
        }));
        this.cdr.detectChanges();
      },
      error : (err) => {
        console.error('Failed to fetch top products by category: ', err);
        this.totalSalesError = 'Could not load top products';
        this.cdr.detectChanges();
      }
    });
  }

  fetchTopSellers() {
    this.topSellersError = '';

    this.orderService.getTopSellers().subscribe({
      next : (sellers) => {
        this.topSellers = sellers;
        this.cdr.detectChanges();
      },
      error : (err) => {
        console.error('Failed to fetch top sellers: ', err);
        this.totalSalesError = 'Could not load top sellers';
        this.cdr.detectChanges();
      }
    });
  }

}
