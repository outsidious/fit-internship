import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, Subject, ReplaySubject, BehaviorSubject, takeUntil, map, filter } from 'rxjs';
import { MyServiceService } from 'src/app/service/my-service.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss'],
})
export class MyPageComponent implements OnInit, OnDestroy {
  constructor(private service: MyServiceService) { }


  ngOnInit(): void {
    const observ = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.complete();
    })

    observ.pipe(map(val => val + 1), filter(val => val != 2)).subscribe((data) => console.log(data));


    /*
    console.log('start');
    const subscription1: Subscription = source.subscribe((data) => {
      console.log(data);
    })
    console.log('end');

    setTimeout(() => {
      const subscription2: Subscription = source.subscribe((data) => {
        console.log(data);
      })
    }, 5000);

    if (subscription1) {
      subscription1.unsubscribe();
      console.log('unsubscribe');
    }


    const source: BehaviorSubject<number> = new BehaviorSubject(0);
    const subscription1: Subscription = source.pipe(takeUntil(this.destroyer$)).subscribe({
      next: (data) => {
        console.log('subscriber1: ', data);
      }
    });

    source.next(1);
    source.next(2);

    const subscription2: Subscription = source.subscribe((data) => {
      console.log('subscriber2: ', data);
    });

    source.next(3);
    source.next(4);
    */
  }

  ngOnDestroy() { }
}
