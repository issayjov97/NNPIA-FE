import { Category } from './category';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Posts } from './post';
import { SearchCriteria } from './search';
import { SkillsService } from './skills.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  posts: Posts;
  collectionSize: number = 0;
  pageSize: number = 5;
  page: number = 1;
  categories: Category[];

  constructor(
    private skillsService: SkillsService,
    private config: NgbRatingConfig
  ) {
    config.max = 5;
    console.log("Initialize skills service");
  }

  ngOnInit(): void {
    this.posts = new Posts();
    this.getAllPosts();
    this.getCategories();
    console.log(this.posts);
    console.log(this.categories);
    this.collectionSize = this.posts.totalCount;
  }

  getAllPosts(search?: SearchCriteria) {
    let currentSearchCriteria = new SearchCriteria();
    if (search?.category?.length > 0)
      currentSearchCriteria.category = search.category;
    if (search?.location?.length > 0)
      currentSearchCriteria.location = search.location;
    if (search?.description?.length > 0)
      currentSearchCriteria.description = search.description;
    if (search?.type)
      currentSearchCriteria.type = search.type;

    console.log(JSON.stringify(currentSearchCriteria));

    this.skillsService.getAllPosts(this.page - 1, this.pageSize, currentSearchCriteria).subscribe(
      (data: Posts) => {
        console.log(data);
        this.posts = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  };


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
  updatePage() {
    this.getAllPosts();
  }

  updatePageSize(size: number) {
    this.pageSize = size;
    this.page = 1;
    this.getAllPosts();

  }

  updateRate(value: string) {
  }

}
