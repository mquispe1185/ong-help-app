import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subject = new Subject<any>();

  constructor() { }

  sendReloadEvent() {
    this.subject.next(true);
  }
  
  getReloadEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }

}
