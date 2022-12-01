import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Campaign } from '../models/campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  BASE_URL = `${environment.API_URL}/campaigns`;

  constructor(private http: HttpClient) { }

  addCampaign(campaign: Campaign): Observable<any> {
    return this.http.post<Campaign>(this.BASE_URL,campaign);
  }

  myCampaigns(): Observable<Campaign[]> {
    let url = `${this.BASE_URL}/user_campaigns`;
    return this.http.get<Campaign[]>(url);
  }

  getCampaign(id: string): Observable<Campaign> {
    let url = `${this.BASE_URL}/${id}`;
    return this.http.get<Campaign>(url);
  }

  updateCampaign(campaign:Campaign):Observable<any>{
    const url= `${this.BASE_URL}/${campaign.id}`;
    return this.http.put(url, campaign);
  }
}
