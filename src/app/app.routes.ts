import { Routes } from '@angular/router';
import { Productbrowsing } from './features/products/productbrowsing/productbrowsing';
import { Productdetails } from './features/products/productdetails/productdetails';

export const routes: Routes = [
    {path : '', component : Productbrowsing},
    {path : 'products/:id', component : Productdetails}
];
