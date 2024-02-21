import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { User } from '../interfaces/user.interface';
import { Observable, Subscriber } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const id = control.parent?.get('id')?.value;
    const email = control.value;

    const httCallObservable = new Observable<ValidationErrors | null>((subscriber) => {
      if(this.router.url.includes('edit')) {
        this.userService.getOneById(id)
        .subscribe( user => {
          if(email === user?.email){
            subscriber.next(null);
            subscriber.complete();
            return;
          } else {
            return this.validateEmail(email, subscriber);
          }
        })
      } else{
        return this.validateEmail(email, subscriber);
      }
    })

    return httCallObservable;

  }

  validateEmail(email: string, subscriber: Subscriber<ValidationErrors | null>) {
    this.userService.getOneByEmail(email)
        .subscribe(user => {
          this.userService.userValidator(email, user?.email, subscriber);
    });
  }
}
