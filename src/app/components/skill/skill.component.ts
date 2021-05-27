import { LoginService } from './../login/login.service';
import { Transaction, TransactionState } from './../user-panel/transactions/transaction';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Post, PostType, Author } from './../skills/post';
import { SkillService } from './skill.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  currentPost: Post;
  postType = PostType;
  constructor(
    private skillService: SkillService,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getPost();
    });
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    this.skillService.getPost(id).subscribe(
      (data: Post) => {
        this.currentPost = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    let result = this.postType[this.currentPost.type] === this.postType[this.postType.NEEDS] ? "Offer help" : "Request service";
    console.log(result);
  }

  createRequest() {
    let author = new Author();
    author.username = this.loginService.getUser().username;
    author.firstname = this.loginService.getUser().firstname;
    author.lastname = this.loginService.getUser().lastname;
    const transaction = new Transaction();
    transaction.requestedAt = new Date().toISOString();
    transaction.status = TransactionState[TransactionState.REQUESTED];
    transaction.user = author;
    transaction.post = this.currentPost;
    this.skillService.createRequest(transaction).subscribe(
      (data) => {
        alert("Request was succsessfully submitted");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

}
