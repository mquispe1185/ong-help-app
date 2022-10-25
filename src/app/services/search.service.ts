import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  BASE_URL = `${environment.API_URL}/search`;

  constructor(private http: HttpClient) { }

  getEntities(name: string): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URL + "?q=" + name);
  }

  getInitEntities(): Observable<any[]> {
    let url = `${this.BASE_URL}/init_entities`;
    return this.http.get<any[]>(url);
  }
}
