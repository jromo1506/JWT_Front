import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn:'root'
})
export class AuthInterceptor implements HttpInterceptor {

  private authService = inject(AuthService);
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getAccessToken();
    console.log('Interceptor activo - URL:', request.url);

        const authReq = token
          ? request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            })
          : request;

        return next.handle(authReq).pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
              return this.authService.refreshToken().pipe(
                switchMap(() => {
                  const newToken = this.authService.getAccessToken();
                  const retryReq = request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${newToken}`
                    }
                  });
                  return next.handle(retryReq);
                })
              );
            }
            return throwError(() => err);
          })
        );
  }
}
