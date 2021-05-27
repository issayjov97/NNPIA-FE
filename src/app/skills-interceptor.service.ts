import { LoginService } from './components/login/login.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SkillsInterceptorService implements HttpInterceptor {

  constructor(
    private loginSevice: LoginService,
    @Inject('baseUrl') private baseUrl: String
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.loginSevice.isLoggedIn()) {
     let wreq =  req.clone({
        url: `${this.baseUrl}${req.url}`,
        headers: req.headers.append("Authorization", `${this.loginSevice.getUser().token}`)
      });
      return next.handle(wreq);

    }
    else{
      let jsonReq = req.clone({
        url: `${this.baseUrl}${req.url}`
      });
      return next.handle(jsonReq);
    }
  }

}
