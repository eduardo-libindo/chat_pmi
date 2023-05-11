import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(data: any): Observable<any> {
    return this.http.post(AUTH_API + '/auth/signup', data, httpOptions);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + '/auth/signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + '/auth/signout', httpOptions);
  }

  refresh_token(): Observable<any> {
    return this.http.post(AUTH_API + '/auth/refresh_token', httpOptions);
  }

  getProtected(): Observable<any> {
    return this.http.get(AUTH_API + '/auth/protected', httpOptions);
  }
}