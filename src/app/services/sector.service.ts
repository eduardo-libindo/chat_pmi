import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sector } from '../models/sector.model';

const API_URL = 'http://localhost:8080/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class SectorService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Sector[]> {
    return this.http.get<Sector[]>(`${API_URL}/sectores`);
  }
}
