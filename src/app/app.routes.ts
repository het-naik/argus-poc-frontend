import { Routes } from '@angular/router';
import { OrderDetail } from './features/orders/order-detail/order-detail';
import { OrderList } from './features/orders/order-list/order-list';
import { CartComponent } from './features/cart/cart';

import { SellerDashboard } from './features/seller/seller-dashboard/seller-dashboard';
import { Productbrowsing } from './features/products/productbrowsing/productbrowsing';
import { Productdetails } from './features/products/productdetails/productdetails';
import { AdminDashboard } from './features/admin/admin-dashboard/admin-dashboard';
import { Login } from './features/auth/login-page/login-page';
import { Register } from './features/auth/register-page/register-page';
import { roleGuard } from './features/auth/role-guard';
import { RoleType } from './core/interfaces/user';
import { ownerOrAdminGuard } from './features/auth/owner-or-admin-guard';
import { Unauthorized } from './shared/components/unauthorized/unauthorized';
import { authGuard } from './features/auth/auth-guard';

export const routes: Routes = [
  {
    path: 'orders',
    loadComponent: () => OrderList,
    canActivate : [authGuard]
  },
  {
    path: 'orders/:id',
    loadComponent: () => OrderDetail,
    canActivate: [authGuard, roleGuard(RoleType.ADMIN, RoleType.CUSTOMER)]
  },
  {
    path: 'carts/customer/:id',
    loadComponent: () => CartComponent,
    canActivate: [authGuard, ownerOrAdminGuard]
  },
  { path: '', component: Productbrowsing, canActivate : [authGuard]},
  { path: 'products/:id', component: Productdetails, canActivate : [authGuard] },
  { path: 'seller', component: SellerDashboard, canActivate: [authGuard, roleGuard(RoleType.SELLER)] },
  { path: 'admin', component: AdminDashboard, canActivate: [authGuard, roleGuard(RoleType.ADMIN)] },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {path: 'unauthorized', component: Unauthorized},
  { path: '**', redirectTo: '' },
];
