import { EditSkillComponent } from './edit-skill/edit-skill.component';
import { Post, PostType } from './../../skills/post';
import { LoginService } from './../../login/login.service';
import { SkillsService } from './../../skills/skills.service';
import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.css']
})
export class MySkillsComponent implements OnInit {

  posts: Post[];
  selectedPost:Post;
  PostType: PostType = PostType.NEEDS;
  constructor(
    private skillsService: SkillsService,
    private loginService: LoginService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.skillsService.getUserPosts(this.loginService.getUser().username).subscribe(
      (data: Post[]) => {
        console.log(data);
        this.posts = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  open(id: string) {
    this.selectedPost = this.posts.find(it=>it.id == id);
    const modalRef = this.modalService.open(EditSkillComponent);
    modalRef.componentInstance.post = this.selectedPost;
  }

  setPost(id: number){
    this.selectedPost = this.posts[id];
  }

  deletePost(id: string) {
    this.skillsService.deletePost(id).subscribe(
      () => {
      }
    ),
      (error: HttpErrorResponse) => {
        alert(error);
      }
  }

}
