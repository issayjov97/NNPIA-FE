import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkillsService } from './../skills/skills.service';
import { PostPageRoutingModule } from './post-page-routing.module';
import { PostPageService } from './post-page.service';
import { PostPageComponent } from './post-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    PostPageComponent
  ],
  imports: [
    CommonModule,
    PostPageRoutingModule,
    FormsModule,
     ReactiveFormsModule,
     NgbModule

  ],
  providers: [
    PostPageService,
    SkillsService
  ]
})
export class PostPageModule { }
