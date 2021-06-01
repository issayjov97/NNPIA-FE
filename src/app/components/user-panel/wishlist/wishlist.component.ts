import { Post } from './../../skills/post';
import { UserPanelService } from './../user-panel.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  posts: Post[];

  constructor(
    private userPanelService: UserPanelService
  ) { }

  ngOnInit(): void {
    this.getWishPosts();
  }

  getWishPosts(){
    this.userPanelService.getWishPosts().subscribe(
      (data: Post[]) => {
        this.posts = data;
        console.log(this.posts);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
