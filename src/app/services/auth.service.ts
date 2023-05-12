import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly AUTH_API?: string;

  constructor(private http: HttpClient) {
    this.AUTH_API = 'http://localhost:8080/api';
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.AUTH_API}/auth/signup`, data, httpOptions);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      `${this.AUTH_API}/auth/signin`,
      {
        username,
        password,
      }
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.AUTH_API}/auth/signout`, httpOptions);
  }

  refresh_token(): Observable<any> {
    return this.http.post(`${this.AUTH_API}/auth/refresh_token`, httpOptions);
  }

  getProtected(): Observable<any> {
    return this.http.get(`${this.AUTH_API}/auth/protected`, httpOptions);
  }
}
