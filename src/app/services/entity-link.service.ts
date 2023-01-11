import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EntityLink } from '../models/entity-link.model';

@Injectable({
  providedIn: 'root'
})
export class EntityLinkService {

  BASE_URL = `${environment.API_URL}/entity_links`;

  constructor(private http: HttpClient) { }

  getEntityLinks(type: string, id: number): Observable<EntityLink[]> {
    let url = `${this.BASE_URL}?type=${type}&id=${id}`;
    return this.http.get<EntityLink[]>(url);
  }

  getMetadata(id: number): Observable<any> {
    let url = `${this.BASE_URL}/${id}`;
    return this.http.get<any>(url);
  }

  addEntityLink(entitylink: EntityLink): Observable<any> {
    return this.http.post<EntityLink>(this.BASE_URL, entitylink);
  }

  deleteEntityLink(entitylink: EntityLink): Observable<any>{
    let url = `${this.BASE_URL}/${entitylink.id}`;
    return this.http.delete<EntityLink>(url);
  }

}
