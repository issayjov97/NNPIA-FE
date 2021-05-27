import { SkillComponent } from './skill.component';
import { SkillRoutingModule } from './skill-routing.module';
import { SkillService } from './skill.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SkillComponent
  ],
  imports: [
    CommonModule,
    SkillRoutingModule,
    NgbModule
  ],
  providers:[
    SkillService
  ]
})
export class SkillModule { }
