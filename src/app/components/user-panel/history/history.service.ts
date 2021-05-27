import { Transaction, TransactionState } from './../transactions/transaction';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getTransactions(username: String, status?: string): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(`/api/v1/transactions?username=${username}&status=${status}`);
  }

}
