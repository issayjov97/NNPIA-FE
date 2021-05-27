import { LoginService } from './../../login/login.service';
import { HistoryService } from './history.service';
import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionState } from '../transactions/transaction';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  transactions: Transaction[];
  constructor(
    private historyService: HistoryService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(
  ) {
    this.historyService.getTransactions(this.loginService.getUser().username, TransactionState[TransactionState.DELIVERED]).subscribe(
      (data: Transaction[]) => {
        this.transactions = data;
        console.log(this.transactions);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  hasDeliveredSkills(): boolean {
    return this.transactions.some(element => element.post.author.username == this.loginService.getUser().username);
  }

  hasRecievedSkills(): boolean {
    return this.transactions.some(element => element.user.username == this.loginService.getUser().username);
  }

}
