import { Routes } from '@angular/router'; 
import { OrderDetail } from './features/orders/order-detail/order-detail';
import { OrderList } from './features/orders/order-list/order-list';
import { CartComponent } from './features/cart/cart';
import { SellerDashboard } from './features/seller/seller-dashboard/seller-dashboard';

export const routes: Routes = [ 
  { 
    path: 'orders',
    loadComponent: () => OrderList
  },
   { 
    path: 'orders/:id',
    loadComponent: () => OrderDetail
  },
   { 
    path: 'carts/customer/:id',
    loadComponent: () => CartComponent
  } ,
    {path: 'seller', component: SellerDashboard}
];
