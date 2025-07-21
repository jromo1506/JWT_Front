import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalApiService } from './global-api.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private api:GlobalApiService) { }


  
  login(user: any): Observable<any> {
    return this.http.post<any>(this.api.getURL() + '/login', user).pipe(
      tap(res => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      })
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<any>(this.api.getURL() + '/refresh', { refreshToken }).pipe(
      tap(res => {
        localStorage.setItem('accessToken', res.accessToken);
      })
    );
  }

  logout(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<any>(this.api.getURL() + '/logout', { refreshToken }).pipe(
      tap(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

}
