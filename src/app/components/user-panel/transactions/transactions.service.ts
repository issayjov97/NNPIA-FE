import { Transaction } from './transaction';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TransactionsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getTransactions(username: String): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(`/api/v1/transactions?username=${username}`);
  }

  updateRating(username: String, rating: String) {
    return this.httpClient.put(`/api/v1/users/rating?username=${username}&rating=${rating}`,null);
  }


  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.httpClient.put<Transaction>(`/api/v1/transactions`, transaction);
  }


}
