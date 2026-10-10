import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { OrderStatus } from '../../../core/models/order.model';


const ORDER_STATUSES: readonly OrderStatus[] = [
  'PENDING',
  'CONFIRMED',
  'SHIPPED',
  'DELIVERED',
];

export interface UpdateOrderStatusDialogData {
  orderId: string;
  currentStatus: OrderStatus;
}

@Component({
  selector: 'app-update-order-status-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './update-order-status-dialog.html',
  styleUrl: './update-order-status-dialog.scss',
})
export class UpdateOrderStatusDialog {
  data = inject<UpdateOrderStatusDialogData>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<UpdateOrderStatusDialog, OrderStatus>);

  statuses = ORDER_STATUSES;
  statusControl = new FormControl<OrderStatus>(this.data.currentStatus, {
    nonNullable: true,
    validators: [Validators.required],
  });

  save() {
    this.dialogRef.close(this.statusControl.value);
  }
}