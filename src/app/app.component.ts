import { LoginService } from './components/login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(
    public loginService: LoginService
  ) {

  }
  ngOnInit(): void {
  }
}
