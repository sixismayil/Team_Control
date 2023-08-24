import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CabinetService } from '../cabinet/cabinet.service';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private cabinetService: CabinetService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
   var token = this.cabinetService.getToken();
    req = req.clone({
      setHeaders: { Authorization: "bearer " + token }
    });
    return next.handle(req);
  }
}
