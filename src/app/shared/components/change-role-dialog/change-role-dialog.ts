import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RoleType, User } from '../../../core/interfaces/user';
import { AuthService } from '../../../features/auth/auth-service';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-change-role-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './change-role-dialog.html',
})
export class ChangeRoleDialog {
  private readonly dialogRef = inject<MatDialogRef<ChangeRoleDialog, User>>(MatDialogRef);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);

  readonly user = inject<User>(MAT_DIALOG_DATA);
  readonly roles = Object.values(RoleType);

  role = new FormControl<RoleType>(this.user.role, { nonNullable: true });
  saving = signal(false);
  error = signal<string | null>(null);

  // Prevent an admin from demoting themselves by accident
  isSelf = this.authService.user().id === this.user.id;

  save() {
    if (this.role.value === this.user.role) {
      this.dialogRef.close();
      return;
    }

    this.saving.set(true);
    this.error.set(null);

    this.userService.changeRole({ id: this.user.id, role: this.role.value }).subscribe({
      next: (updated) => this.dialogRef.close(updated),
      error: () => {
        this.saving.set(false);
        this.error.set('Could not update the role. Please try again.');
      },
    });
  }
}