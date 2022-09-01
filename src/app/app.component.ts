import { Component } from '@angular/core';
import { interval, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  minutes: any
  counter: any
  showImage: boolean = false;
  image: string = 'assets/paris.jpg';
  subcription : Subscription  = new Subscription();

  ngOnInit() {
    this.launch();
    this.counter = 10;
    this.minutes = 1;
  }


  interval$ = interval(1000).pipe(
    map(() => {
      this.counter = this.counter - 1;
      return this.counter;
    })
  );

  observer = {
    next: (value: number) => {
      this.counter = value;
      if (this.counter == -1 && this.minutes > 0) {
        this.showImage = false;
        this.counter = 59;
        this.minutes = this.minutes - 1;
      } else if (this.minutes == 0 && this.counter == 0) {
        this.showImage = true;
        this.subcription.unsubscribe();
      } else if (this.counter < 0) {
        this.counter = 0;
      } 
      this.counter < 10 ? (this.counter = '0' + this.counter) : this.counter;
    },
  };

  launch() {
     this.subcription =  this.interval$.subscribe(this.observer);
  }
}
