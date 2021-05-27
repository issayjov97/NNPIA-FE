import { LoginService } from './login.service';
import { AuthenticationRequest, AuthenticationResponse } from './authentication';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: AuthenticationResponse;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  login(request: AuthenticationRequest) {
    this.loginService.authenticate(request).subscribe(
      (data: AuthenticationResponse) => {
        console.log(data);
        this.loginService.setUser(data);
    this.router.navigateByUrl('/skills');
  },
      (error: HttpErrorResponse) => {
  alert(error.message);
}
    );
  }
}
