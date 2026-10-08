import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Address } from '../../../core/models/order.model';
import { AddressRequest, Addressservice } from '../../orders/order-detail/address.service';

export interface AddAddressDialogData {
  customerId: string;
}

@Component({
  selector: 'app-add-address-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <h2 mat-dialog-title>Add delivery address</h2>

    <form [formGroup]="form" (ngSubmit)="save()">
      <mat-dialog-content class="flex flex-col gap-2 pt-2">
        <mat-form-field appearance="outline">
          <mat-label>Address line 1</mat-label>
          <input matInput formControlName="line_1" autocomplete="address-line1" />
          <mat-error>Required, 3 to 60 characters</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Address line 2 (optional)</mat-label>
          <input matInput formControlName="line_2" autocomplete="address-line2" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Address line 3 (optional)</mat-label>
          <input matInput formControlName="line_3" autocomplete="address-line3" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>City</mat-label>
          <input matInput formControlName="city" autocomplete="address-level2" />
          <mat-error>Required, 3 to 30 characters</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>State</mat-label>
          <input matInput formControlName="state" autocomplete="address-level1" />
          <mat-error>Required, at least 3 characters</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>PIN code</mat-label>
          <input matInput formControlName="zipCode" autocomplete="postal-code" inputmode="numeric" maxlength="6" />
          <mat-error>Enter exactly 6 digits</mat-error>
        </mat-form-field>

        @if (errorMessage(); as msg) {
          <p class="text-sm text-red-600" role="alert">{{ msg }}</p>
        }
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button type="button" mat-dialog-close [disabled]="saving()">Cancel</button>
        <button mat-flat-button type="submit" [disabled]="saving()">
          {{ saving() ? 'Saving…' : 'Save address' }}
        </button>
      </mat-dialog-actions>
    </form>
  `,
})
export class AddAddressDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddAddressDialog, Address>);
  private addressService = inject(Addressservice);
  private data: AddAddressDialogData = inject(MAT_DIALOG_DATA);

  saving = signal(false);
  errorMessage = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    line_1: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    line_2: [''],
    line_3: [''],
    city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    state: ['', [Validators.required, Validators.minLength(3)]],
    zipCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
const payload: AddressRequest = {
  line_1: raw.line_1.trim(),
  line_2: raw.line_2.trim() || undefined,
  line_3: raw.line_3.trim() || undefined,
  city: raw.city.trim(),
  state: raw.state.trim(),
  zipCode: raw.zipCode.trim(),
  customerId: this.data.customerId,
};

    this.saving.set(true);
    this.errorMessage.set(null);
    this.dialogRef.disableClose = true;

    this.addressService.addAddress(payload).subscribe({
      next: (created) => this.dialogRef.close(created),
      error: (err: HttpErrorResponse) => {
        this.saving.set(false);
        this.dialogRef.disableClose = false;
        this.errorMessage.set(err.error?.message ?? 'Could not save the address. Please try again.');
      },
    });
  }
}