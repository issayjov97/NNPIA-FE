import { HttpErrorResponse } from '@angular/common/http';
import { PasswordSettingsService } from './password-settings.service';
import { PasswordChangeRequest } from './passwordChangeRequest';
import { LoginService } from './../../login/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'app-password-settings',
  templateUrl: './password-settings.component.html',
  styleUrls: ['./password-settings.component.css'],
  providers: [PasswordSettingsService]
})
export class PasswordSettingsComponent implements OnInit {

  passwordFormGroup: FormGroup;
  passwordChangeRequest: PasswordChangeRequest;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private passwordSettingsService: PasswordSettingsService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.passwordFormGroup = this.formBuilder.group({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: this.formBuilder.group({
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        cpPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
      }, { validators: [this.equalValidator] }),
    });
  }

  submit() {
    this.passwordChangeRequest = new PasswordChangeRequest();
    this.passwordChangeRequest.currentPassword = this.passwordFormGroup.get('currentPassword').value;
    this.passwordChangeRequest.newPassword = this.passwordFormGroup.get('newPassword.password').value;
    this.passwordSettingsService.changePassword(this.loginService.getUser().username, this.passwordChangeRequest).subscribe(
      (data) => { console.log(data) },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public equalValidator(control: FormGroup): ValidationErrors | null {
    const [password, cppassword] = Object.values(control.value);
    console.log(password);
    console.log(cppassword);
    return password === cppassword ? null : {
      'nonEqualsPassword': 'Please enter the same password'
    }
  }

}
