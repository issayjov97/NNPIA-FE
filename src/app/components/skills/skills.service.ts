import { Category } from './category';
import { SearchCriteria } from './search';
import { Post, Posts } from './post';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SkillsService {

  constructor(
    private httpClient: HttpClient
  ) { }


  public getAllPosts(page: number, size: number, search?: SearchCriteria): Observable<Posts> {
    return this.httpClient.post<Posts>(`/api/v1/posts/search?page=${page}&size=${size}`, search);
  }


  public getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('/api/v1/categories');
  }

  public getUserPosts(username: string): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`/api/v1/posts?username=${username}`);
  }

  public updatePost(id: string, post: Post): Observable<any> {
    return this.httpClient.put(`/api/v1/posts/${id}`, post);

  }

  public deletePost(id: string) {
    return this.httpClient.delete(`/api/v1/posts/${id}`);
  }
}
