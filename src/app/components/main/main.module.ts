import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [MainComponent],
  imports: [
    MainRoutingModule
  ]
})
export class MainModule { }
