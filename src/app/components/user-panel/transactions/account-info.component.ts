import { Author } from './../../skills/post';
import { LoginService } from './../../login/login.service';
import { TransactionsService } from './transactions.service';
import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionState } from './transaction';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  myTransactions: Transaction[];
  transactionState = TransactionState;
  loginService: LoginService;
  rating: number = 5;

  selectedTransaction: Transaction;
  constructor(
    private transactionService: TransactionsService,
    private _loginService: LoginService,
    private config: NgbRatingConfig

  ) {
    this.loginService = _loginService;
    this.config.max = 5;
  }

  ngOnInit(): void {
    this.getTransactions();
  }
  hasRequests(): boolean {
    return this.myTransactions.some(element => element.status.toString() == TransactionState[TransactionState.REQUESTED].toString());
  }

  hasActiveProcesses(): boolean {
    return this.myTransactions.some(element => element.status.toString() == TransactionState[TransactionState.APPROVED].toString() ||
      element.status.toString() == TransactionState[TransactionState.ACTIVE].toString());
  }


  getTransactions(
  ) {
    this.transactionService.getTransactions(this.loginService.getUser().username).subscribe(
      (data: Transaction[]) => {
        this.myTransactions = data;
        console.log(this.myTransactions);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  setTransaction(index: number) {
    console.log(index);
    console.log(this.myTransactions);

    this.selectedTransaction = this.myTransactions[index];
    console.log(this.selectedTransaction);

  }

  showRequestApproveDialog(): boolean {
    return this.selectedTransaction.post.author.username == this.loginService.getUser().username &&
      this.selectedTransaction.status.toString() == TransactionState[TransactionState.REQUESTED].toString();
  }

  showSkillHOursInput(): boolean {
    return this.selectedTransaction.post.author.username == this.loginService.getUser().username &&
      this.selectedTransaction.status.toString() == TransactionState[TransactionState.APPROVED].toString() &&
      this.selectedTransaction.agreedSkillHours == undefined;
  }

  showSkillHOursConfirmationDialog(): boolean {
    return this.selectedTransaction.agreedSkillHours &&
      this.selectedTransaction.user.username == this.loginService.getUser().username &&
      this.selectedTransaction.status.toString() == TransactionState[TransactionState.APPROVED].toString();
  }


  showDeliveredConfirmationDialog(): boolean {
    return this.selectedTransaction.status == TransactionState[TransactionState.ACTIVE] &&
      this.selectedTransaction.post.author.username == this.loginService.getUser().username;
  }

  showConfirmDeliveredConfirmationDialog(): boolean {
    return this.selectedTransaction.status == TransactionState[TransactionState.ACTIVE] &&
      this.selectedTransaction.user.username == this.loginService.getUser().username;
  }

  showRatingAuhtorDialog(): boolean {
    return this.selectedTransaction.status == TransactionState[TransactionState.DELIVERED] &&
      this.selectedTransaction.user.username == this.loginService.getUser().username;
  }


  changeTransactionState() {
    this.selectedTransaction.status = this.transactionState[this.transactionState.APPROVED];
  }

  setTransactionSkillHours(value: String) {
    console.log(value);
    this.selectedTransaction.approvedByAuthorAt = new Date().toISOString();
    this.selectedTransaction.agreedSkillHours = value;
    this.updateTransactionState(this.selectedTransaction);
  }

  confirmTransactionSkillHours() {
    this.selectedTransaction.approvedByRequesterAt = new Date().toISOString();
    this.selectedTransaction.status = this.transactionState[this.transactionState.ACTIVE];
    this.updateTransactionState(this.selectedTransaction);
  }

  confirmDeliveryByAuthor() {
    this.selectedTransaction.deliveredByAuthorAt = new Date().toISOString();
    this.updateTransactionState(this.selectedTransaction);
    this.updateRate(this.selectedTransaction.user.username,this.selectedTransaction.user.rating);
  }
  confirmDeliveryByRequester() {
    this.selectedTransaction.deliveredByRequesterAt = new Date().toISOString();
    this.selectedTransaction.status = this.transactionState[this.transactionState.DELIVERED];
    this.updateTransactionState(this.selectedTransaction);
    this.updateRate(this.selectedTransaction.post.author.username,this.selectedTransaction.post.author.rating);
  }


  updateTransactionState(transaction: Transaction) {
    this.transactionService.updateTransaction(transaction).subscribe(
      (data: Transaction) => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deliveredTransaction() {
    this.selectedTransaction.deliveredByAuthorAt = new Date().toISOString();
  }

  confirmDeliveredTransaction() {
    this.selectedTransaction.status = TransactionState[TransactionState.DELIVERED].toString();
    this.selectedTransaction.deliveredByRequesterAt = new Date().toISOString();
  }

  updateRate(email: String, value: String) {
    this.transactionService.updateRating(email, value).subscribe(
      () => {
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  //updateRate(user:  ) {
  // this.loginService.getUser().rating = value;
  //}

}
//showSkillHOursConfirmationDialog
