import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthService {
  baseUrl: string = '/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  parseJwt(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  public get token(): string | null {
    return localStorage.getItem('del_meetups_auth_token');
  }

  public get user(): any {
    const token = this.token;
    if (token) {
      const user = this.parseJwt(token);
      return user;
    }
    return null;
  }

  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap((res) => {
          console.log(res);
          if (res.token) {
            localStorage.setItem('del_meetups_auth_token', res.token);
            this.router.navigate(['my']);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('del_meetups_auth_token');
    this.router.navigate(['login']);
  }

  getSomething(): Observable<Object> {
    return this.http.get('api/meetup');
  }
}
