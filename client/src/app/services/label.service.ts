import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private apiUrl = 'http://localhost:443/api/label';

  constructor(private http: HttpClient) {}

  getAllLabels(): Observable<any> {
    const url = `${this.apiUrl}/`;
    return this.http.get(url);
  }

  createLabel(label: any): Observable<any> {
    const url = `${this.apiUrl}/`;
    return this.http.post(url, label);
  }

  updateLabel(id: number, label: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, label);
  }

  deleteLabel(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
