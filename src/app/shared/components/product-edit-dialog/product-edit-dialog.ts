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

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.html',
  styleUrl: './product-edit-dialog.scss',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class ProductEditDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ProductEditDialog, Product>);
  private productService = inject(Productservice);
  product: Product = inject(MAT_DIALOG_DATA);

  categories = Object.values(CategoryType).map((value) => ({
    value,
    label: formatCategory(value),
  }));

  saving = signal(false);
  errorMessage = signal<string | null>(null);

  // validators mirror ProductRequestDto
  form = this.fb.nonNullable.group({
    name: [
      this.product.name,
      [Validators.required, Validators.pattern(/\S/), Validators.minLength(2), Validators.maxLength(100)],
    ],
    description: [this.product.description, [Validators.maxLength(1000)]],
    pricePerUnit: [this.product.pricePerUnit, [Validators.required, Validators.min(0.1)]],
    stock: [
      this.product.stock,
      [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)],
    ],
    categoryType: [this.product.categoryType, Validators.required],
    productImageUrl: [this.product.productImageUrl],
  });

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { productImageUrl, ...rest } = this.form.getRawValue();
    const payload: ProductRequest = {
      ...rest,
      productImageUrl: productImageUrl || undefined,
      sellerId: this.product.sellerId, // required by the backend DTO for now
    };

    this.saving.set(true);
    this.errorMessage.set(null);
    this.dialogRef.disableClose = true;

    this.productService.updateProduct(this.product.productId, payload).subscribe({
      next: (updated) => this.dialogRef.close(updated), // use the server's version
      error: (err: HttpErrorResponse) => {
        this.saving.set(false);
        this.dialogRef.disableClose = false;
        this.errorMessage.set(err.error?.message ?? 'Could not save the product. Please try again.');
      },
    });
  }
}