import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, of } from 'rxjs';
import { PaginationProduct } from '../interfaces/pagination-product.interface';
import { Product } from '../interfaces/product.interface';

@Injectable({providedIn: 'root'})
export class ProductService {
  constructor(private http: HttpClient) { }

  private baseUrl = environment.baseUrl;

  getAll(): Observable<PaginationProduct> {
    return this.http.get<PaginationProduct>(`${this.baseUrl}/products`);
  }

  getOneById(id: number): Observable<Product | undefined> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`)
      .pipe(
        catchError( error => of(undefined))
      );
  }

  saveOne(product: Product): Observable<Product>{
    return this.http.post<Product>(`${this.baseUrl}/products`, product);
  }

  uploadFile(file: FormData, name: string): Observable<any>{
    return this.http.post(`${this.baseUrl}/products/upload`, file, { params: { name } });
  }

}
