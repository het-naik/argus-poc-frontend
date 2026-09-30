import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialog } from '../edit-profile-dialog/edit-profile-dialog';
import { AuthService } from '../../../features/auth/auth-service';

@Component({
  selector: 'app-profile-card',
  imports: [MatButtonModule],
  templateUrl: './profile-card.html',
})
export class ProfileCard {
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);

  user = this.authService.user;
  initial = computed(() => this.user().username.charAt(0).toUpperCase());

  openEditDialog() {
    this.dialog.open(EditProfileDialog, {
      width: '440px',
      autoFocus: 'first-tabbable',
    });
  }
}