import { Service } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Service()
export class SellerService {
  updateProduct(productId: String, payload: any): Observable<any> {
    console.log('updateProduct called', productId, payload);
    return of({ productId, ...payload }).pipe(delay(600)); 
  }
}
