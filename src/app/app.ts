import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SellerDashboard } from './features/seller/seller-dashboard/seller-dashboard';
import { Productbrowsing } from './features/products/productbrowsing/productbrowsing';

@Component({
  imports: [RouterOutlet, Productbrowsing, SellerDashboard],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}

