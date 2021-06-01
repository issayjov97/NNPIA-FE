import { Post } from './../skills/post';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPanelService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getWishPosts(): Observable<Post[]>{
  return this.httpClient.get<Post[]>('/api/v1/users/wishlist');
  }
}
