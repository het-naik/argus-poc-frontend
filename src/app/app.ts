import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Productbrowsing } from './features/products/productbrowsing/productbrowsing';

@Component({
  imports: [RouterOutlet, Productbrowsing],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}

