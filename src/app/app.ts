import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SellerDashboard } from './features/seller/seller-dashboard/seller-dashboard';
import { Productbrowsing } from './features/products/productbrowsing/productbrowsing';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';



@Component({
  imports: [RouterOutlet, Productbrowsing, SellerDashboard, Header, Footer],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}

