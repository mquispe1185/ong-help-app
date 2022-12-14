import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ong } from '../models/ong.model';

@Injectable({
  providedIn: 'root'
})
export class OngService {

  BASE_URL = `${environment.API_URL}/ongs`;

  constructor(private http: HttpClient) { }

  addOng(ong: Ong): Observable<any> {
    return this.http.post<Ong>(this.BASE_URL, ong);
  }

  getOngs(): Observable<Ong[]> {
    return this.http.get<Ong[]>(this.BASE_URL);
  }

  myOngs(): Observable<Ong[]> {
    let url = `${this.BASE_URL}/user_ongs`;
    return this.http.get<Ong[]>(url);
  }

  getOng(id: number): Observable<Ong> {
    let url = `${this.BASE_URL}/${id}`;
    return this.http.get<Ong>(url);
  }

  updateOng(ong:Ong):Observable<any>{
    const url= `${this.BASE_URL}/${ong.id}`;
    return this.http.put(url, ong);
  }
}
