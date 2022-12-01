import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Donation } from '../models/donation.model';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  BASE_URL = `${environment.API_URL}/donations`;

  constructor(private http: HttpClient) { }

  getDonations(type: string, id: number): Observable<Donation[]> {
    let url = `${this.BASE_URL}?type=${type}&id=${id}`;
    return this.http.get<Donation[]>(url);
  }

}
