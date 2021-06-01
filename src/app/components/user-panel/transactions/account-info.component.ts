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
    this.selectedTransaction = this.myTransactions[index];
  }

  approveTransaction() {
    this.selectedTransaction.status = this.transactionState[this.transactionState.APPROVED];
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

  setTransactionSkillHours(value: String) {
    let transaction = new Transaction();
    transaction.id = this.selectedTransaction.id;
    transaction.approvedByAuthorAt = this.selectedTransaction.approvedByAuthorAt = new Date().toISOString();
    transaction.agreedSkillHours = this.selectedTransaction.agreedSkillHours = value;
    transaction.status = this.selectedTransaction.status = this.transactionState[this.transactionState.APPROVED];
    this.updateTransactionState(transaction);

  }

  confirmTransactionSkillHours() {
    let transaction = new Transaction();
    transaction.id = this.selectedTransaction.id;
    transaction.approvedByRequesterAt = this.selectedTransaction.approvedByRequesterAt = new Date().toISOString();
    transaction.status = this.selectedTransaction.status = this.transactionState[this.transactionState.ACTIVE];
    this.updateTransactionState(transaction);
  }

  confirmDeliveryByAuthor() {
    let transaction = new Transaction();
    transaction.id = this.selectedTransaction.id;
    transaction.deliveredByAuthorAt = this.selectedTransaction.deliveredByAuthorAt = new Date().toISOString();
    this.updateTransactionState(transaction);
    this.updateRate(this.selectedTransaction.user.username, this.selectedTransaction.user.rating);
  }
  confirmDeliveryByRequester() {
    let transaction = new Transaction();
    transaction.id = this.selectedTransaction.id;
    transaction.deliveredByRequesterAt = this.selectedTransaction.deliveredByRequesterAt = new Date().toISOString();
    transaction.status = this.selectedTransaction.status = this.transactionState[this.transactionState.DELIVERED];
    this.updateTransactionState(transaction);
    this.updateRate(this.selectedTransaction.post.author.username, this.selectedTransaction.post.author.rating);
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
