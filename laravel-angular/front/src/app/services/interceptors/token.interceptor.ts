import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        const requestUrl: Array<any> = req.url.split('/');
        const baseUrl:  Array<any> = environment.baseUrl.split('/');

        if(token && (requestUrl[2] == baseUrl[2])){
            const newRequest = req.clone({ setHeaders: { 'Authorization' : `Bearer ${token}` } });
            return next.handle(newRequest);
        }else{
            return next.handle(req);
        }
  }
}