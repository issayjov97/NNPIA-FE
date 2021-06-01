import { UserInfoUpdateRequest } from './settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class SettingsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  updateUser(settings: UserInfoUpdateRequest): Observable<any> {
    return this.httpClient.put<any>("/api/v1/users/info", settings,{
      headers: {
        'Content-Type': 'file'
      },
    });
  }

}
