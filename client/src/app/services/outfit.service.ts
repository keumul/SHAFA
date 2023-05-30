import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutfitService {
    private baseUrl = 'https://localhost:443/api';

    constructor(private http: HttpClient) {}
      getAllOutfits(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/outfit/user/${id}`);
      }
    
      createOutfit(body: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/outfit/`, body);
      }
      getOutfitStuff(outfitId: number):Observable<any> {
        return this.http.get(`${this.baseUrl}/stuff/${outfitId}/outfits`);
      }
      fillOutfit(body: any, outfitId: number):Observable<any> {
        console.log(body);
        return this.http.post(`${this.baseUrl}/outfit/${outfitId}`, {stuffId: body});
      }
      deleteOutfit(outfitId: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/outfit/${outfitId}`);
      }
      updateOutfit(id: number, body: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/outfit/${id}`, body);
      }

}