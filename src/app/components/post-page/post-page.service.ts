import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Post } from './../skills/post';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostPageService {

  constructor(
    private http: HttpClient
  ) { }

  createPost(post: Post): Observable<Response>{
    return this.http.post<Response>(`/api/v1/posts`,post)
  }
}
