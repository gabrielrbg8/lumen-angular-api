import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(catchError((errorResponse: HttpErrorResponse) => {
            
            if (errorResponse.status === 401 ) {
                const http = this.injector.get(HttpClient);
                console.log(errorResponse);
                return http.post<any>(`${environment.baseUrl}/auth/refresh`, {}).pipe(
                    mergeMap(data => {
                        localStorage.setItem('token', data.access_token);
                        const cloneRequest = request.clone({ setHeaders: { 'Authorization': `Bearer ${data.access_token}` } });

                        return next.handle(cloneRequest);
                    })
                )

            }

            return Observable.throw(errorResponse);
        }));
    }
}