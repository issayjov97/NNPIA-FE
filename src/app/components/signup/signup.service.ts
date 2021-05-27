import { environment } from './../../../environments/environment';
import { SignupRequest } from './signuprequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SignupService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public signup(request: SignupRequest): Observable<String> {
    return this.httpClient.post<Response>( "/api/v1/auth/signup", request, { observe: 'response' }).pipe(
      map(response => {
        return response.statusText;
      })
    );
  }
}
