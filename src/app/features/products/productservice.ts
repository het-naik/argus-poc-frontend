import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryType, Product, ProductRequest } from '../../core/interfaces/Product';
import { Page } from '../../core/interfaces/Page';

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

    getProductsBySeller(
    sellerId: string,
    page: number,
    size: number,
    sort?: string,
  ): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(`${this.baseUrl}/seller/${sellerId}`, {
      params: this.toParams(page, size, sort),
    });
  }

  getProductsByCategory(
    category: CategoryType,
    page: number,
    size: number,
    sort?: string,
  ): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(`${this.baseUrl}/category/${category}`, {
      params: this.toParams(page, size, sort),
    });
  }

  addProduct(request: ProductRequest): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, request);
  }

  updateProduct(id: string, request: ProductRequest): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, request);
  }

  updateProductStock(id: string, stock: number): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${id}/stock`, stock);
  }

  updateProductPrice(id: string, price: number): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${id}/price`, price);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private toParams(page: number, size: number, sort?: string): HttpParams {
    let params = new HttpParams().set('page', page).set('size', size);
    if (sort) {
      params = params.set('sort', sort);
    }
    return params;
  }
}