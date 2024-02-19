import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, Subscriber, catchError, of } from 'rxjs';
import { PaginationUser, User } from '../interfaces/user.interface';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll(page: number, size: number): Observable<PaginationUser> {
    return this.http.get<PaginationUser>(`${this.baseUrl}/users?pageNumber=${page}&pageSize=${size}`);
  }

  getOneByEmail(value: string): Observable<User | undefined>{
    return this.http.get<User>(`${this.baseUrl}/users/email/${value}`).pipe(
      catchError( error => of(undefined))
    )
  }

  getOneByDni(value: string): Observable<User | undefined>{
    return this.http.get<User>(`${this.baseUrl}/users/dni/${value}`).pipe(
      catchError( error => of(undefined))
    )
  }

  userValidator(value1: string, value2: string | undefined, subscriber: Subscriber<ValidationErrors | null>): void {
    if(value1 === value2){
      subscriber.next({ userFound : true});
      subscriber.complete();
    }

    subscriber.next(null);
    subscriber.complete();
  }
}
