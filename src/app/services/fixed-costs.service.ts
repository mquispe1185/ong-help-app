import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FixedCost } from '../models/fixed-cost.model';

@Injectable({
  providedIn: 'root'
})
export class FixedCostsService {

  BASE_URL = `${environment.API_URL}/fixed_costs`;

  constructor(private http: HttpClient) { }

  getFixedCosts(type: string, id: number): Observable<FixedCost[]> {
    let url = `${this.BASE_URL}?type=${type}&id=${id}`;
    return this.http.get<FixedCost[]>(url);
  }

}
