import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  RES_URL  =  `${environment.API_URL}/categories`;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.RES_URL);
  }
}
