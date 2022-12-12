import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss'],
})
export class MyPageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    /*this.authService.getSomething().subscribe((data: Object) => {
      console.log(data);
    });*/

    const source = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.next(4);
      subscriber.next(5);
      subscriber.complete();
    });

    const subsription: Subscription = source
      .pipe(
        map((val) => val - 1),
        map((val) => val + 1)
      )
      .subscribe({
        next: (data: number) => {
          console.log(data);
        },
        complete: () => {
          console.log('complete');
        },
        error: (er) => {
          console.log(er);
        },
      });

    if (subsription) {
      subsription.unsubscribe();
      console.log('ubsubscribe');
    }

    /*const mySubject: BehaviorSubject<number> = new BehaviorSubject(0);
    mySubject.next(1);
    mySubject.next(2);
    mySubject.next(3);

    const subsription1: Subscription = mySubject.subscribe({
      next: (data) => {
        console.log(`first: ${data}`);
      },
      complete: () => {
        console.log('first complete');
      },
      error: (er) => {
        console.log(er);
      },
    });

    mySubject.next(4);
    mySubject.next(5);

    const subsription2: Subscription = mySubject.subscribe({
      next: (data) => {
        console.log(`second: ${data}`);
      },
      complete: () => {
        console.log('second complete');
      },
      error: (er) => {
        console.log(er);
      },
    });

    mySubject.next(6);
    mySubject.next(7);*/
  }
}
