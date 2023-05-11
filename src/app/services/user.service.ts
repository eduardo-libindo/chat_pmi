import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../models/data.model';
import { User } from '../models/user.model';

const API_URL = 'http://localhost:8080/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    return this.http.post(`${API_URL}/users`, data, httpOptions);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users`);
  }
  
  getAllActives(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users/actives`);
  }

  getAllOnlines(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users/onlines`);
  }
  
  getByName(username: any): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users/search?username=${username}`);
  }

  getByUser(id: any): Observable<User> {
    return this.http.get<User>(`${API_URL}/users/${id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL}/users/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URL}/users/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${API_URL}/users`);
  }

}
