import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss'],
})
export class MyPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const observable = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 3000);
      // подписка 2
    });

    observable.subscribe({
      next: (data) => {
        console.log(`Subscriber_1: ${data}`);
      },
      error: console.log,
      complete: () => console.log('complete'),
    });

    setTimeout(() => {
      observable.subscribe((data) => {
        console.log(`Subscriber_2: ${data}`);
      });
    }, 4000);

    /*if (subscription) {
      subscription.unsubscribe();
      console.log('unsubscribe');
    }*/
  }
}
