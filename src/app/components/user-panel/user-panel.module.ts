import { EditSkillComponent } from './my-skills/edit-skill/edit-skill.component';
import { TransactionsService } from './transactions/transactions.service';
import { CommonModule } from '@angular/common';
import { SkillsService } from './../skills/skills.service';
import { UserPanelRoutingModule } from './user-panel-routing.module';
import { UserPanelService } from './user-panel.service';
import { NgModule } from '@angular/core';
import { AccountInfoComponent } from './transactions/account-info.component';
import { UserPanelComponent } from './user-panel.component';
import { HistoryComponent } from './history/history.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { SettingsComponent } from './settings/settings.component';
import { PasswordSettingsComponent } from './password-settings/password-settings.component';
import { AccountDeactivationComponent } from './account-deactivation/account-deactivation.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostTypePipe } from './my-skills/post-type.pipe';
import { RequestInfoComponent } from './request-info/request-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AccountInfoComponent,
    UserPanelComponent,
    HistoryComponent,
    MySkillsComponent,
    SettingsComponent,
    PasswordSettingsComponent,
    AccountDeactivationComponent,
    WishlistComponent,
    RequestInfoComponent,
    PostTypePipe,
    EditSkillComponent
    ],
  imports: [
    UserPanelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule

  ],
  providers: [
    UserPanelService,
    SkillsService,
    TransactionsService
  ]
})
export class UserPanelModule { }
