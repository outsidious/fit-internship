import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private http: HttpClient) { }

  getData(): Observable<Object> {
    return this.http.get('https://api.fit-meetups.ru/meetup');
  }
}
