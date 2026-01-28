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

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    const authHeader = this.authService.getAuthorizationHeader();
    console.log('Interceptor activo - URL:', request.url);
    console.log('AUTH HEADER =>', authHeader);

    const authReq = authHeader
      ? request.clone({
          setHeaders: {
            Authorization: authHeader
          }
        })
      : request;

    return next.handle(authReq);
  }
}
