import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShafaService {
  private baseUrl = 'https://localhost:443/api';

  constructor(private http: HttpClient) { }

  getOutfits(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/outfit`); 
  }

  getAllShelves(): Observable<any> {
    return this.http.get(`${this.baseUrl}/shelf/admin`);
  }

  getShelfById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/shelf/admin/${id}`);
  }

  getAllStuffs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stuff/admin`);
  }

  getStuffById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/stuff/admin/${id}`);
  }
}
