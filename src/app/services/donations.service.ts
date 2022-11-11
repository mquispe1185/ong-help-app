import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contribution } from '../models/contribution.model';
import { Donation } from '../models/donation.model';
import { ItemDonation } from '../models/item-donation.model';

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  BASE_URL = `${environment.API_URL}/item_donations`;
  BASE = `${environment.API_URL}/donations`;
  BASE2 = `${environment.API_URL}/contributions`;

  constructor(private http: HttpClient) { }

  getItemDonations(type: string, id: number): Observable<ItemDonation[]> {
    let url = `${this.BASE_URL}?type=${type}&id=${id}`;
    return this.http.get<ItemDonation[]>(url);
  }

  getDonations(type: string, id: number): Observable<Donation[]> {
    let url = `${this.BASE}?type=${type}&id=${id}`;
    return this.http.get<Donation[]>(url);
  }

  getContributions(type: string, id: number): Observable<Contribution[]> {
    let url = `${this.BASE2}?type=${type}&id=${id}`;
    return this.http.get<Contribution[]>(url);
  }

}
