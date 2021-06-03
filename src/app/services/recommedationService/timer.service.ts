import { Injectable, Pipe, PipeTransform} from '@angular/core';
import { Subject, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  public message = new Subject<number>();

  countDown: Subscription;
  count = this.calculateDifferentTime("2021-06-4")
  tick = 1000;
  constructor(){

  }

  countTimes(){
    this.countDown = timer(0,this.tick).subscribe(()=>{
      --this.count
      console.log(typeof(this.count))
    })
  }

  calculateDifferentTime(expiredDate: any) {
    let currentDate: any = new Date();
    if (expiredDate == null) {
      return -1;
    }
    expiredDate = new Date(expiredDate);
    return (expiredDate - currentDate);
  }
}


@Pipe({
  name: "formatTime"
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    return ('00' + hours).slice(-2) + ':' + ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
}
}