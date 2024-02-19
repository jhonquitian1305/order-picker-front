import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({providedIn: 'root'})
export class DniValidator implements AsyncValidator {

  constructor(private userService: UserService) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const dni = control.value;

    const httCallObservable = new Observable<ValidationErrors | null>((subscriber) => {
      this.userService.getOneByDni(control.value)
        .subscribe(user => {
          this.userService.userValidator(dni, user?.dni, subscriber);
      });
    })

    return httCallObservable;

  }

}
