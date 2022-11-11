import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subject = new Subject<any>();

  constructor() { }

  sendReloadEvent(reload: boolean) {
    this.subject.next(reload);
  }

  getReloadEvent(): Observable<any> {
    return this.subject.asObservable();
  }

}
