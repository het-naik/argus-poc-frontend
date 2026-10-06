import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryType, Product, ProductRequest, formatCategory } from '../../../core/interfaces/product';
import { Productservice } from '../../../features/products/productservice';
import { MatIconModule } from '@angular/material/icon';

export interface ProductAddDialogData {
  sellerId: string;
}

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: './add-product-dialog.html',
  styleUrl: './add-product-dialog.scss',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
})
export class ProductAddDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ProductAddDialog, Product>);
  private productService = inject(Productservice);
  private data: ProductAddDialogData = inject(MAT_DIALOG_DATA);

  categories = Object.values(CategoryType).map((value) => ({
    value,
    label: formatCategory(value),
  }));

  saving = signal(false);
  errorMessage = signal<string | null>(null);

  form = this.fb.group({
    name: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/\S/),
      Validators.minLength(2),
      Validators.maxLength(100),
    ]),
    description: this.fb.nonNullable.control('', [Validators.maxLength(1000)]),
    pricePerUnit: this.fb.control<number | null>(null, [Validators.required, Validators.min(0.1)]),
    stock: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d+$/),
    ]),
    categoryType: this.fb.control<CategoryType | null>(null, Validators.required),
    productImageUrl: this.fb.nonNullable.control(''),
  });

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { productImageUrl, pricePerUnit, stock, categoryType, ...rest } = this.form.getRawValue();
    const payload: ProductRequest = {
      ...rest,
      pricePerUnit: pricePerUnit!,
      stock: stock!,
      categoryType: categoryType!,
      productImageUrl: productImageUrl || undefined,
      sellerId: this.data.sellerId,
    };

    this.saving.set(true);
    this.errorMessage.set(null);
    this.dialogRef.disableClose = true;

    this.productService.addProduct(payload).subscribe({
      next: (created) => this.dialogRef.close(created),
      error: (err: HttpErrorResponse) => {
        this.saving.set(false);
        this.dialogRef.disableClose = false;
        this.errorMessage.set(err.error?.message ?? 'Could not create the product. Please try again.');
      },
    });
  }
}