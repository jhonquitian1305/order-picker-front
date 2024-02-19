import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator {

  constructor(private userService: UserService) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;

    const httCallObservable = new Observable<ValidationErrors | null>((subscriber) => {
      this.userService.getOneByEmail(control.value)
        .subscribe(user => {
          this.userService.userValidator(email, user?.email, subscriber);
      });
    })

    return httCallObservable;

  }
}
