import { AuthenticationResponse } from './../login/authentication';
import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  user: AuthenticationResponse;
  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
  }

}


