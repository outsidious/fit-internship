import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'https://api.fit-meetups.ru/auth';

  //meetups$: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http: HttpClient, private router: Router) {

    /*setInterval(() => {
      this.http.get('....').subscribe((data) => {
        // обработка dat-ы, преобразования ...
        this.meetups$.next(data);
      })
    }, 60000);*/
  }

  login(email?: any, password?: any) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { email, password }).pipe(map((res) => {
      if (res.token) {
        localStorage.setItem('meetups_auth_token', res.token);
      }
      return null;
    }))
  }

  logout() {
    localStorage.removeItem('meetups_auth_token');
    this.router.navigate(['login']);
  }

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
    return localStorage.getItem('meetups_auth_token');
  }

  public get user(): any {
    const token = this.token;
    if (token) {
      const user = this.parseJwt(token);
      return user;
    }
    return null;
  }
}
