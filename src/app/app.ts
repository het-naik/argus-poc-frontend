import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SellerDashboard } from './features/seller/seller-dashboard/seller-dashboard';


@Component({
  imports: [RouterOutlet,  SellerDashboard],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}

