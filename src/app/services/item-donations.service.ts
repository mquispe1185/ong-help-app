import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemDonation } from '../models/item-donation.model';

@Injectable({
  providedIn: 'root'
})
export class ItemDonationsService {

  BASE_URL = `${environment.API_URL}/item_donations`;

  constructor(private http: HttpClient) { }

  getItemDonations(type: string, id: number): Observable<ItemDonation[]> {
    let url = `${this.BASE_URL}?type=${type}&id=${id}`;
    return this.http.get<ItemDonation[]>(url);
  }

  addItemDonation(itemDonation: ItemDonation): Observable<any> {
    return this.http.post<ItemDonation>(this.BASE_URL, itemDonation);
  }

  updateItemDonation(itemDonation: ItemDonation): Observable<any> {
    let url = `${this.BASE_URL}/${itemDonation.id}`;
    return this.http.put<ItemDonation>(url, itemDonation);
  }

  deleteItemDonation(itemDonation: ItemDonation): Observable<any> {
    let url = `${this.BASE_URL}/${itemDonation.id}`;
    return this.http.delete<ItemDonation>(url);
  }

}
