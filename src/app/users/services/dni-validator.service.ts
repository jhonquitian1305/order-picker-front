import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class DniValidator implements AsyncValidator {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const id = control.parent?.get('id')?.value;
    const dni = control.value;

    const httCallObservable = new Observable<ValidationErrors | null>((subscriber) => {

      if(this.router.url.includes('edit')) {
        this.userService.getOneById(id)
        .subscribe( user => {
          if(dni === user?.dni){
            subscriber.next(null);
            subscriber.complete();
            return;
          } else{
            return this.validateDni(dni, subscriber);
          }
        })
      } else{
        return this.validateDni(dni, subscriber);
      }
    })

    return httCallObservable;

  }

  validateDni(dni: string, subscriber: Subscriber<ValidationErrors | null>) {
    this.userService.getOneByDni(dni)
        .subscribe(user => {
          this.userService.userValidator(dni, user?.dni, subscriber);
    });
  }

}
