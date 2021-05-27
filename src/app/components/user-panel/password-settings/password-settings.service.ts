import { Observable } from 'rxjs';
import { PasswordChangeRequest } from './passwordChangeRequest';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PasswordSettingsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public changePassword(email: String, request: PasswordChangeRequest): Observable<PasswordChangeRequest> {
   console.log(email);
    return this.httpClient.post<PasswordChangeRequest>(`/api/v1/users/${email}/password`, request);
  }

}
