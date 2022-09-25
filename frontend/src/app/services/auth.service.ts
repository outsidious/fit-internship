import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = '/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
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

  public get user(): any {
    const token = localStorage.getItem('del_meetups_auth_token');
    if (token) {
      const user = this.parseJwt(token);
      return user;
    }
    return null;
  }

  public get token(): string | null {
    const token = localStorage.getItem('del_meetups_auth_token');
    return token;
  }

  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        map((res) => {
          if (res.token) {
            localStorage.setItem('del_meetups_auth_token', res.token);
          }
          return null;
        })
      );
  }

  logout() {
    localStorage.removeItem('del_meetups_auth_token');
    this.router.navigate(['login']);
  }

  /*getTest(): Observable<Object> {
    return this.http.get('https://swapi.dev/api/people');
  }*/
}
