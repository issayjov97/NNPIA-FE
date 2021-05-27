import { Transaction } from './../user-panel/transactions/transaction';
import { environment } from './../../../environments/environment';
import { Post } from './../skills/post';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPost(id: string): Observable<Post> {
    return this.httpClient.get<Post>(`/api/v1/posts/${id}`);
  }
  createRequest(transaction: Transaction): Observable<any> {
    return this.httpClient.post<Transaction>(`/api/v1/transactions`, transaction);
  }
}
