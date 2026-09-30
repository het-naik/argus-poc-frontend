// edit-profile-dialog.ts
import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../../core/interfaces/User';
import { AuthService } from '../../../features/auth/auth-service';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.html',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class EditProfileDialog {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<EditProfileDialog, User>);
  private authService = inject(AuthService);

  private user = this.authService.getUser();

  saving = signal(false);
  errorMessage = signal<string | null>(null);

  // validators mirror UpdateProfileRequestDTO
  form = this.fb.nonNullable.group({
    username: [
      this.user.username,
      [Validators.required, Validators.pattern(/\S/), Validators.minLength(2), Validators.maxLength(50)],
    ],
    email: [this.user.email, [Validators.required, Validators.email, Validators.maxLength(255)]],
  });

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, email } = this.form.getRawValue();
    const payload = { username: username.trim(), email: email.trim() };

    if (payload.username === this.user.username && payload.email === this.user.email) {
      this.dialogRef.close();
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);
    this.dialogRef.disableClose = true;

    this.authService.updateProfile(payload).subscribe({
      next: (updated) => this.dialogRef.close(updated),
      error: (err: HttpErrorResponse) => {
        this.saving.set(false);
        this.dialogRef.disableClose = false;
        this.errorMessage.set(err.error?.message ?? 'Could not update your profile. Please try again.');
      },
    });
  }
}