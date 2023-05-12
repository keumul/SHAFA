import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAllShelves() {
    return this.http.get(`${this.baseUrl}/shelf`);
  }

  createShelf(name: string, userId: string, categoryId: string) {
    const body = { name, userId, categoryId };
    return this.http.post(`${this.baseUrl}/shelf`, body);
  }

  sharedAccess(shelfId: string, userId: string) {
    const body = { userId };
    return this.http.post(`${this.baseUrl}/shelf/${shelfId}`, body);
  }

  updateShelf(id: string, name: string, userId: string, categoryId: string) {
    const body = { name, userId, categoryId };
    return this.http.put(`${this.baseUrl}/shelf/${id}`, body);
  }

  deleteShelf(id: string) {
    return this.http.delete(`${this.baseUrl}/shelf/${id}`);
  }
}