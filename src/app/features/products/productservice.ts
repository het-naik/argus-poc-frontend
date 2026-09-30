import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Page } from '../../core/interfaces/Product';

@Service()
export class Productservice {

    private baseUrl = 'http://localhost:8080/api/products';

    private http = inject(HttpClient);

    getProducts(page : number, size : number, sort ?: string) : Observable<Page<Product>> {

      let params = new HttpParams().set('page', page).set('size', size);

      if(sort) {
        params = params.set('sort', sort);
      }

      return this.http.get<Page<Product>>(this.baseUrl, {params});

    }
    
    getProductById(id : string) : Observable<Product> {
      return this.http.get<Product>(`${this.baseUrl}/${id}`);
    }
}
