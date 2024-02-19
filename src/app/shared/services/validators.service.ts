import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

  constructor() { }

  getFieldError(form: FormGroup, field: string): string | null {
    if(!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength } caracteres.`;

        case 'pattern':
          if(field === 'fullName') return `El formato debe ser nombre y apellido`;

          if(field === 'email') return `Debe ser un email válido`;
          break;

        case 'notEqual':
          return 'Las contraseñas deben ser iguales';

        case 'userFound':
          return `El ${field} ya se encuentra en uso`;
      }
    }

    return null;
  }

  public isFieldOneEqualFieldTwo(field1: string, field2: string){
    return (formGroup: AbstractControl ): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if(fieldValue1 !== fieldValue2){
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      formGroup.get(field2)?.setErrors(null);

      return null;
    }
  }
}
