import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CategoryType, Product, ProductRequest } from '../../core/interfaces/Product';
import { Page, PageParams } from '../../core/interfaces/Page';


@Service()
export class ProductService {

  private http = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:8080/api/products';
  private readonly jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getAllProducts(pageParams: PageParams = {}): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(this.baseUrl, { params: this.toParams(pageParams) });
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${productId}`);
  }

  getProductsBySeller(sellerId: string, pageParams: PageParams = {}): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(`${this.baseUrl}/seller/${sellerId}`, {
      params: this.toParams(pageParams),
    });
  }

  getProductsByCategory(category: CategoryType, pageParams: PageParams = {}): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(`${this.baseUrl}/category/${category}`, {
      params: this.toParams(pageParams),
    });
  }

  addNewProduct(payload: ProductRequest): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, payload);
  }

  updateProduct(productId: string, payload: ProductRequest): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${productId}`, payload);
  }

  updateProductStock(productId: string, stock: number): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${productId}/stock`, JSON.stringify(stock), {
      headers: this.jsonHeaders,
    });
  }

  updateProductPrice(productId: string, price: number): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${productId}/price`, JSON.stringify(price), {
      headers: this.jsonHeaders,
    });
  }

  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${productId}`);
  }

  private toParams({ page, size, sort }: PageParams): HttpParams {
    let params = new HttpParams();
    if (page !== undefined) params = params.set('page', page);
    if (size !== undefined) params = params.set('size', size);
    if (sort) params = params.set('sort', sort);
    return params;
  }

}
