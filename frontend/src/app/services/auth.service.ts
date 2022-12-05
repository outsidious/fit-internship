import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable()
export class AuthService {
  baseUrl: string = 'api';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap((res) => {
          console.log(res);
          if (res.token) {
            localStorage.setItem('del_meetups_auth_token', res.token);
          }
        })
      );
  }

  logout() {}
}
