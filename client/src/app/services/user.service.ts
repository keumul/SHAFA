import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:443/api';

  constructor(private http: HttpClient) {}
  getAllUsers(): Observable<any>{
    return this.http.get(`${this.baseUrl}/user`);
  }

  getUserRole(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/role/${id}`);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/user/${id}`);
  }
}