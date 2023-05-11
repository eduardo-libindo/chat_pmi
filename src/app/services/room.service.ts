import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';

const API_URL = 'http://localhost:8080/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private http: HttpClient) {}


  create(data: any): Observable<any> {
    return this.http.post(`${API_URL}/rooms`, data);
  }
  
  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>(`${API_URL}/rooms`);
  }

  getAllActives(): Observable<Room[]> {
    return this.http.get<Room[]>(`${API_URL}/rooms/actives`);
  }

  getByName(name: any): Observable<Room[]> {
    return this.http.get<Room[]>(`${API_URL}/rooms/search?name=${name}`);
  }

  getByRoom(id: any): Observable<Room> {
    return this.http.get<Room>(`${API_URL}/rooms/${id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL}/rooms/${id}`,data,httpOptions);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URL}/rooms/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${API_URL}/rooms`);
  }

}
