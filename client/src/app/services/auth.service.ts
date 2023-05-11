import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
  pronounces: string;
  roleId: number;
}

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(loginForm: FormGroup): Observable<AuthResponse> {
    const { email, password } = loginForm.value;
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(res => localStorage.setItem('token', res.token))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getUserRole(): Observable<number> {
    return this.http.get<number>(`http://localhost:3000/api/user/role/:id`);
  }
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // returns true if token is not null or undefined
  }

  redirectToProfile(roleId: number): void {
    if (roleId === 4) {
      this.router.navigateByUrl('/user-profile');
    } else if (roleId === 1) {
      this.router.navigateByUrl('/admin-profile');
    }
    // Add more conditions for other roles if needed
  }
}
