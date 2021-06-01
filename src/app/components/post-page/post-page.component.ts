import { PostPageService } from './post-page.service';
import { LoginService } from './../login/login.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Post, PostType } from './../skills/post';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from './../skills/category';
import { SkillsService } from './../skills/skills.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  postFormGroup: FormGroup;
  newPost: Post;
  rating: String = "5";

  keyword: String;
  categories: Category[];
  PostType = PostType;

  constructor(
    private route: ActivatedRoute,
    private skillsService: SkillsService,
    private loginService: LoginService,
    private postPageSrvice: PostPageService,
    private fomrbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.keyword = this.route.snapshot.paramMap.get('keyword');
      this.initForm();
    });
    this.getCategories();
  }

  initForm() {
    this.postFormGroup = this.fomrbuilder.group({
      category: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      location: new FormControl('', [Validators.required, Validators.minLength(2)]),
      title: new FormControl('', [Validators.required, Validators.minLength(6)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      image: new FormControl(''),
      details: new FormControl('', [Validators.required,])
    });
  }
  getCategories() {
    this.skillsService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      }
    ),
      (error: HttpErrorResponse) => {
        alert(error);
      }

  }

  onSubmit() {
    this.newPost = new Post();
    this.newPost.category = new Category();
    this.newPost.category.name = this.postFormGroup.get('category').value;
    this.newPost.category.image = this.postFormGroup.get('image').value;
    this.newPost.details = this.postFormGroup.get('details').value;
    this.newPost.description = this.postFormGroup.get('description').value;
    this.newPost.title = this.postFormGroup.get('title').value;
    this.newPost.type = this.postFormGroup.get('type').value;
    this.newPost.author = this.loginService.getUser();
    console.log(this.newPost);
    this.postPageSrvice.createPost(this.newPost).subscribe(
      (data) => {alert("Post was successfully created!") },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
