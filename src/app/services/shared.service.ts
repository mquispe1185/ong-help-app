import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subject = new Subject<any>();
  private subjectOng = new Subject<any>();
  private subjectCampaign = new Subject<any>();

  constructor() { }

  sendReloadEvent(reload: boolean) {
    this.subject.next(reload);
  }

  getReloadEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  sendReloadOng() {
    this.subjectOng.next(true);
  }

  getReloadOng(): Observable<any>{ 
    return this.subjectOng.asObservable();
  }

  sendReloadCampaign() {
    this.subjectCampaign.next(true);
  }

  getReloadCampaign(): Observable<any>{ 
    return this.subjectCampaign.asObservable();
  }

}
