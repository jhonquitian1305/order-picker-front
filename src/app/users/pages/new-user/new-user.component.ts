import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../services/email-validator.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { DniValidator } from '../../services/dni-validator.service';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {

  firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator,
    private dniValidator: DniValidator,
    private userService: UserService,
    private router: Router,
  ) {}

  hide = true;
  myForm: FormGroup = this.fb.group({
    fullName: ['', [ Validators.required, Validators.pattern(this.firstNameAndLastnamePattern) ]],
    dni: ['', [ Validators.required, Validators.minLength(6) ], [ this.dniValidator ]],
    email: ['', [ Validators.required, Validators.pattern(this.emailPattern) ],  [ this.emailValidator ] ],
    password: ['', [ Validators.required, Validators.minLength(8) ]],
    password2: ['',  Validators.required ],
    address: ['', [ Validators.required, Validators.minLength(5) ]],
    phone: ['', [ Validators.required, Validators.minLength(8) ]],
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  get currentUser(): User {
    return this.myForm.value;
  }

  showPassword(){
    this.hide = !this.hide;
  }

  getFieldError(field: string){
    return this.validatorsService.getFieldError(this.myForm, field);
  }

  saveUser(): void{
    this.currentUser.role = 'USER';
    this.userService.saveOne(this.currentUser)
      .subscribe( user => {
        console.log(user);
        this.router.navigateByUrl('/users/list')
      })

  }
}
