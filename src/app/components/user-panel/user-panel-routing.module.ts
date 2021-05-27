import { WishlistComponent } from './wishlist/wishlist.component';
import { HistoryComponent } from './history/history.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { SettingsComponent } from './settings/settings.component';
import { PasswordSettingsComponent } from './password-settings/password-settings.component';
import { AccountDeactivationComponent } from './account-deactivation/account-deactivation.component';
import { AccountInfoComponent } from './transactions/account-info.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPanelComponent } from './user-panel.component';
import { RequestInfoComponent } from './request-info/request-info.component';

const routes: Routes = [
  {
    path: '',
    component: UserPanelComponent,
    children: [
      {
        path: 'transactions', component: AccountInfoComponent,
        children: [
          { path: 'request-info', component: RequestInfoComponent }
        ]
      },
      { path: 'request-info', component: RequestInfoComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'my-skills', component: MySkillsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'password-reset', component: PasswordSettingsComponent },
      { path: 'account-deactivation', component: AccountDeactivationComponent }
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserPanelRoutingModule { }
