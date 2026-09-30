import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  imports: [MatIconModule],
  selector: 'app-footer',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  currentYear = new Date().getFullYear();
}
