import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PaginationUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll(page: number, size: number): Observable<PaginationUser> {
    return this.http.get<PaginationUser>(`${this.baseUrl}/users?pageNumber=${page}&pageSize=${size}`);
  }
}
