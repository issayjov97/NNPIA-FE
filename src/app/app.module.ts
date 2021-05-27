import { SkillsInterceptorService } from './skills-interceptor.service';
import { environment } from './../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { RoutingModule } from './routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

   ],
  providers: [
    AuthGuard,
    {
      provide: 'baseUrl',
      useValue: environment.baseUrl,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SkillsInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
