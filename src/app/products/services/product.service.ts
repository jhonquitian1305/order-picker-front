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

}
