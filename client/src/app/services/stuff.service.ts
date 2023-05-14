import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StuffService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAllStuffs(user_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/stuff/user/${user_id}`);
  }

  createStuff(stuffData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/stuff`, stuffData);
  }

  getStuffById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/stuff/${id}`);
  }

  updateStuff(id: number, stuffData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/stuff/${id}`, stuffData);
  }

  deleteStuff(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/stuff/${id}`);
  }
}
