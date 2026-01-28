import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalApiService } from './global-api.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly TOKEN_TYPE_KEY = 'tokenType';
  constructor(private http:HttpClient,private api:GlobalApiService) { }



  login(user:any): Observable<any> {
    return this.http.post(this.api.getURL() + "/auth/login",user);
  }


  register(user:any): Observable<any>{
    return this.http.post(this.api.getURL() + "/auth/register",user);
  }


  saveToken(token: string, type: string) {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('token_type', type); // Bearer
}

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  getTokenType(): string | null {
    return sessionStorage.getItem(this.TOKEN_TYPE_KEY);
  }


  
getAuthorizationHeader(): string | null {
  const token = sessionStorage.getItem('token');
  const type = sessionStorage.getItem('token_type');

  if (!token || !type) return null;

  return `${type} ${token}`; // Bearer eyJhbGci...
}


  clear(): void {
    sessionStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  
  // login(user: any): Observable<any> {
  //   return this.http.post<any>(this.api.getURL() + '/login', user).pipe(
  //     tap(res => {
  //       localStorage.setItem('accessToken', res.accessToken);
  //       localStorage.setItem('refreshToken', res.refreshToken);
  //     })
  //   );
  // }

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
