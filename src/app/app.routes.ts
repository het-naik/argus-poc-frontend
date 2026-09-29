import { Routes } from '@angular/router';
import { Productbrowsing } from './features/products/productbrowsing/productbrowsing';
import { Productdetails } from './features/products/productdetails/productdetails';
import { SellerDashboard } from './features/seller/seller-dashboard/seller-dashboard';

export const routes: Routes = [
    {path : '', component : Productbrowsing},
    {path : 'products/:id', component : Productdetails},
    {path: 'seller', component: SellerDashboard}
];
