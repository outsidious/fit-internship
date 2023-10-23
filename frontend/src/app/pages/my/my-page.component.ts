import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MyServiceService } from 'src/app/service/my-service.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss'],
})
export class MyPageComponent implements OnInit {
  constructor(private service: MyServiceService) { }

  ngOnInit(): void {
    const source = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.error();
    })


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
  }
}
