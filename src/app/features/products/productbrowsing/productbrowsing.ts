import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

export interface Product {
  id : number;
  name : string;
  description : string;
  price : number;
  imageUrl : string;
}

export interface CategoryFilter {
  label : string;
  checked : boolean;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';


@Component({
  imports: [CommonModule, FormsModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatCardModule,
    MatCheckboxModule, MatRadioModule, MatSliderModule, MatDividerModule, MatPaginatorModule],
  selector: 'app-productbrowsing',
  styleUrl: './productbrowsing.scss',
  templateUrl: './productbrowsing.html',
})


export class Productbrowsing {

  searchTerm = '';

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

  products: Product[] = [
    {
      id: 1,
      name: 'Speaker',
      description: 'Android speaker which can be connected to bluetooth.',
      price: 1000.00,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_toa6VIVS7WpCXWcUkZVY8-ogiToO8r0kcQp-7vLfomKtb4jpjETQVT5Gk56P5NGjQ9xoNJ6EmQqjNlaO6tEAX-Tt0kiVY6htqJdd3_CE6LG6_5QWF8bbourxdN4usWo4mgjIbBaUoY0g5wJxnD7EwnBgoyUPlIrT1gM14jbRHKbJ-oTxPZsSIqOxy1b6XXpM0HbBDBQFhAIFqYUQixxHU3se08asMAEfBvNnB0jhT0XkPVBDf3c6Vw'
    },
    {
      id: 2,
      name: 'Watch',
      description: 'Black analog watch',
      price: 4000.00,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6RpppUNk97dBYPcPbPVSg2sXk0nwDym7Nt9NrOXvpbMpC2w9b3PjqDxA6_4JS9YBbZXOWKqHSfHvOaEOb-Lh_fLXGFhAsiI0WtB0a5Ge7dAFBDqpL0N9Pv5jrlNz7GlRJoLPt6szSZ08N62ulEYFAmoLUdLSrctPszWEsk3KNbF6nH9jy4QJDaewp_2JKMz3nnXlSuUhryIsNW-aUt-y7il4q0SBiOBsna6BV8NJA_3jT3Fm2stAkUA'
    },
    {
      id: 3,
      name: 'Pen holder',
      description: 'Solid cast iron pen holder',
      price: 100.00,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClpGu73tRIke2mRKe8t3XBz-E4lewfZAXgsxqBt0CQwK-0jd_sqcI4Vgm_5ZNwD_c6AVEY6pEFWOmHOW2YW8vwEdhZWpIUlKVmV7_YXjVA-qgSc3hyaEEaNMw-TKc7zBTNDzIJjHP8ln1WbK-a1RGCAK5Oxe0SURhmaLTJk9pIEWp28ZoAvsBHl5e2gwI84_M3WOn3OFtT7B5xmwQPz1d9v1HhkB3VlbAV6Z4qNYWLiEo5d4K3jjo8sQ'
    },
    {
      id: 4,
      name: 'Ceramic Vessel',
      description: 'Ceramic storage container',
      price: 600.00,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFJBJQvlqFWJp_g52lGSplfqTn3jyE3LRR7ZIf-PQCzYW9byaMoEPLSHZlyTMAuL7po3CcLopfdhA51jVN05QS0ekXdvWuipFo1goFmqHiStEYb36RzqSDvsvHiqLkGzgJIdA8-UHhD9usvIv65ItF9jaKe7eKiMdHzwZVkxNgUy5IVjGob7fEv61WWcm64FxLdogpfZcERrvXY34z7QQ36GUOyXvZwl4q-cSTl2Q8zR_86JqwBRoEcA'
    },
    {
      id: 5,
      name: 'Foldable lamp',
      description: 'Foldable LED lamp',
      price: 250.00,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSqfi7iwhKhcJnjmC4nXHxc3ab-3mBmi_ShhI_f5yLnIZLrcSLXaASNJGqireLfoaQj6C-FT779ZLtLHqchnxGQa7iswIBhG1j1LhfB-gcIoKKCVG1wd2hW6n9r96SCr2PnHsxWJZ5nfPq0AlbO_yPB-speSgxXmGA9p3b_a_24M38N2D_TWjaCcDKMm0i9HmtqHgAINwnJ2y4cBvKSYQ77rxVDMhb4a_GXVlqtEn27K7lKPhBkch5dQ'
    },
    {
      id: 6,
      name: 'Headphones',
      description: 'White',
      price: 999.00,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDStuLX5H7vtDY0o29RY3c6nS3I2Emdel7rab6CQCaJk5N7kIzTNfKZeoW7Ao_mCsZ_DbckU05rmElPStHgxNy-uCZEQcDcrDRf1-ma1DHMuO7n5kNQc0QDrnOHppn-dDge3xlzP76Rz-mo5cJgWve_-04CQHiVeb-52zopuFAXgrJpVN6Nyvoug9ArrSNZ-UAUjNCIAI6OQh2NkJK4Vd-FuCdbABTryp4IpYzXD9TlOxBVHECrM16O4w'
    }
  ];

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

}
