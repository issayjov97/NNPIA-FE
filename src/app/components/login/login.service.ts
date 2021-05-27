import { AuthenticationRequest, AuthenticationResponse } from './authentication';
import { environment } from '../../../environments/environment';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable(
  {
    providedIn: 'root'
  }
)
export class LoginService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  public authenticate(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    console.log(`Login request: ${JSON.stringify(request)}`)
    let data = this.httpClient.post<AuthenticationResponse>('/api/v1/auth/login', request);
    return data;

  }

  public isLoggedIn(): Boolean {
    return this.getUser() != null;
  }

  public getUser(): AuthenticationResponse {
    return JSON.parse(sessionStorage.getItem("user"));
  }

  public setUser(user: AuthenticationResponse) {
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  public logout() {
    sessionStorage.removeItem("user");
  }




}
