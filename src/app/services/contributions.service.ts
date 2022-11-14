import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contribution } from '../models/contribution.model';

@Injectable({
  providedIn: 'root'
})
export class ContributionsService {

  BASE_URL = `${environment.API_URL}/contributions`;

  constructor(private http: HttpClient) { }

  getContributions(type: string, id: number): Observable<Contribution[]> {
    let url = `${this.BASE_URL}?type=${type}&id=${id}`;
    return this.http.get<Contribution[]>(url);
  }

}
