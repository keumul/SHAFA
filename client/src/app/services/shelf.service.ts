import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}
  getAllCategories(): Observable<any>{
    return this.http.get(`${this.baseUrl}/shelf/categ`);
  }
  getAllShelves(user_id: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/shelf/user/${user_id}`);
  }

  createShelf(name: string, userId: number, categoryId: number) {
    const body = { name, userId, categoryId };
    return this.http.post(`${this.baseUrl}/shelf`, body);
  }

  sharedAccess(shelfId: number, userId: number) {
    const body = { userId };
    return this.http.post(`${this.baseUrl}/shelf/${shelfId}`, body);
  }

  updateShelf(id: number, name: string, userId: number, categoryId: number) {
    const body = { name, userId, categoryId };
    return this.http.put(`${this.baseUrl}/shelf/${id}`, body);
  }

  deleteShelf(id: number) {
    return this.http.delete(`${this.baseUrl}/shelf/${id}`);
  }
}