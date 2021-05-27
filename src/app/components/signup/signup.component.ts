import { SignupRequest } from './signuprequest';
import { SignupService } from './signup.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

interface FormData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  passwords: {
    password: string;
    cpppassword: string
  }

}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm = this.builder.group({
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    passwords: this.builder.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        cppassword: ['', [Validators.required, Validators.minLength(8)]]
      }, {
      validators: [this.equalValidator]
    })
  });

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private signupService: SignupService
  ) { }

  ngOnInit(): void {
  }

  signup(value: FormData) {
    const request = new SignupRequest();
    request.firstname = value.firstname;
    request.lastname = value.lastname;
    request.email = value.email;
    request.username = value.username;
    request.password = value.passwords.password;
    this.signupService.signup(request).subscribe(
      data => {
        alert(data);
        this.router.navigateByUrl('/login');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public equalValidator(control: FormGroup): ValidationErrors | null {
    const [password, cppassword] = Object.values(control.value);
    return password === cppassword ? null : {
      'nonEqualsPassword': 'Please enter the same password'
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log("FOR IS VALID")
    }
    else {
      console.log("FORM IS INVALID")
    }
  }

  get firstname() { return this.signupForm.get('firstname'); }
  get lastname() { return this.signupForm.get('lastname'); }
  get email() { return this.signupForm.get('email'); }
  get username() { return this.signupForm.get('username'); }
  get passwords() { return this.signupForm.get('passwords'); }
  get password() { return this.signupForm.get('passwords').get("password"); }
  get cppassword() { return this.signupForm.get('passwords').get('cppassword'); }



}
