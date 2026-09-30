import { AfterViewInit, Component, effect, inject, input, output, viewChild } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { formatCategory, Product } from '../../../core/interfaces/Product';
import { ProductEditDialog } from '../product-edit-dialog/product-edit-dialog';

@Component({
  selector: 'app-product-table',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CurrencyPipe,
    DatePipe,
  ],
  styleUrl: './product-table.scss',
  templateUrl: './product-table.html',
})
export class ProductTable implements AfterViewInit {

  products = input.required<Product[]>();
  productUpdated = output<Product>();

  displayedColumns: string[] = [
    'productImageUrl',
    'name',
    'description',
    'categoryType',
    'pricePerUnit',
    'stock',
    'createdAt',
    'updatedAt',
  ];

  dataSource = new MatTableDataSource<Product>([]);

  paginator = viewChild.required(MatPaginator);
  sort = viewChild.required(MatSort);
  formatCategory = formatCategory;

  private readonly dialog = inject(MatDialog);

  constructor() {
    effect(() => {
      this.dataSource.data = this.products();
    });

    this.dataSource.filterPredicate = (p: Product, filter: string) =>
      `${p.name} ${p.description} ${formatCategory(p.categoryType)} ${p.pricePerUnit} ${p.stock}`
        .toLowerCase()
        .includes(filter);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator();
    this.dataSource.sort = this.sort();
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  openEditDialog(product: Product) {
    this.dialog
      .open<ProductEditDialog, Product, Product>(ProductEditDialog, {
        width: '520px',
        data: product,
        autoFocus: 'first-tabbable',
      })
      .afterClosed()
      .subscribe((updated) => {
        if (updated) this.productUpdated.emit(updated);
      });
  }
}