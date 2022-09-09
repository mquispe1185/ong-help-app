import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  RES_URL  =  `${environment.API_URL}/cities`;

  constructor(private http: HttpClient) { }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.RES_URL);
  }
}
