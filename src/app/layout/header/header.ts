import { Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../features/auth/auth-service';
import { RoleType } from '../../core/interfaces/user';


@Component({
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {

  constructor(private router: Router, private authService: AuthService) { }

  showDashboardLink = computed(() => {
    const role = this.authService.getUser().role;
    return (role === RoleType.SELLER || role === RoleType.ADMIN);
  });

  showOrdersLink = computed(() => {
    const role = this.authService.getUser().role;
    return (role === RoleType.CUSTOMER || role === RoleType.SELLER);
  });

  dashboardRoute = computed(() => {
    const role = this.authService.getUser().role;
    if (role === RoleType.SELLER) {
      return '/seller';
    }
    if (role === RoleType.ADMIN) {
      return '/admin';
    }
    return '/';
  });
  logout() {
    this.router.navigate(['/login']).then(() => this.authService.logout());
  }
}
