import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { SellerService } from '../seller-service';
import { CategoryType, Product, formatCategory } from '../../../core/interfaces/Product';


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
export class ProductEditDialog{
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ProductEditDialog, Product>);
  private sellerService = inject(SellerService);
  product: Product = inject(MAT_DIALOG_DATA);

  categories = Object.values(CategoryType).map((value) => ({
    value,
    label: "sdbsdba",
  }));

  saving = signal(false);

  form = this.fb.nonNullable.group({
    name: [this.product.name, [Validators.required, Validators.maxLength(100)]],
    description: [this.product.description, [Validators.required, Validators.maxLength(200)]],
    pricePerUnit: [this.product.pricePerUnit, [Validators.required, Validators.min(0)]],
    stock: [
      this.product.stock,
      [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)],
    ],
    categoryType: [this.product.categoryType, Validators.required],
    productImageUrl: [this.product.productImageUrl, Validators.required],
  });

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();
    this.saving.set(true);

    this.sellerService.updateProduct(this.product.productId, payload).subscribe({
      next: () => this.dialogRef.close({...this.product, ...payload}),
      error: () => this.saving.set(false),
    });
  }
}