import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'skills',
    loadChildren: () => import('./components/main/main.module').then(module => module.MainModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(module => module.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./components/signup/signup.module').then(module => module.SignupModule)
  },
  {
    path: 'discover',
    loadChildren: () => import('./components/skills/skills.module').then(module => module.SkillsModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'post/:keyword',
    loadChildren: () => import('./components/post-page/post-page.module').then(module => module.PostPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'user-panel',
    loadChildren: () => import('./components/user-panel/user-panel.module').then(module => module.UserPanelModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'skill/:id',
    loadChildren: () => import('./components/skill/skill.module').then(module => module.SkillModule),
    canActivate:[AuthGuard]
  },
  {
    path: '', redirectTo: '/skills', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/skills', pathMatch: 'full'
  }

]

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
