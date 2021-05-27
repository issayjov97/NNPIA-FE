import { SkillsService } from './skills.service';
import { SkillsRoutingModule } from './skills-routing.module';
import { SkillsComponent } from './skills.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SkillsComponent
  ],
  imports: [
    CommonModule,
    SkillsRoutingModule,
    NgbModule,
    FormsModule
    ],
  providers:[
    SkillsService
  ]
})
export class SkillsModule { }
