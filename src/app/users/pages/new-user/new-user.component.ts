import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../services/email-validator.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { DniValidator } from '../../services/dni-validator.service';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit {

  firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator,
    private dniValidator: DniValidator,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.userService.getOneById(id)
      ))
      .subscribe( user => {
        if(!user) return this.router.navigateByUrl('/');

        this.userForm.reset(user);
        return;
      })
  }

  hide = true;
  userForm: FormGroup = this.fb.group({
    id: (''),
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
    return this.userForm.value;
  }

  showPassword(){
    this.hide = !this.hide;
  }

  getFieldError(field: string){
    return this.validatorsService.getFieldError(this.userForm, field);
  }

  onSubmit(): void{
    if(this.userForm.invalid) return;

    this.currentUser.role = 'USER';

    if(this.currentUser.id) {
      this.userService.updateOne(this.currentUser)
      .subscribe( () => {
        this.toastr.success('Usuario actualizado con éxito');
        this.router.navigateByUrl('/users/list');
      });

      return;
    }

    this.userService.saveOne(this.currentUser)
      .subscribe( () => {
        this.toastr.success('Usuario creado con éxito');
        this.router.navigateByUrl('/users/list');
      });
  }

  onCopyAndPaste(event: ClipboardEvent){
    event.preventDefault();
  }
}
