import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appUserValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UserValidatorDirective,
      multi: true
    }

  ]
})
export class UserValidatorDirective implements Validator {


  validate(control: FormControl): ValidationErrors | null {
    const isValid: boolean = /^[a-zA-Z]*$/.test(control.value);
    return isValid ? null : {
      'onlyLetters': 'Only letters are allowed'
    };
  }
}
