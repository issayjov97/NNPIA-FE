import { SkillsService } from './../../../skills/skills.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/components/skills/post';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})


export class EditSkillComponent implements OnInit {
  @Input() post: Post;

  constructor(
    public activeModal: NgbActiveModal,
    private skillsService: SkillsService
  ) { }

  ngOnInit() {
    console.log(this.post.title);
  }

  updatePost() {
    this.skillsService.updatePost(this.post.id, this.post).subscribe(
      () => {
      }
    ),
      (error: HttpErrorResponse) => {
        alert(error);
      }
  }
}
