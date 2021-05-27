import { AccountInfoComponent } from './account-info.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestInfoComponent } from '../request-info/request-info.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AccountInfoComponent,
    children: [
      { path: 'request-info', component: RequestInfoComponent}
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(routes)

  ],
  declarations: []
})
export class TransactionsRoutingModule { }
