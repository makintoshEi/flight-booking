import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  domain = 'http://localhost:5000'
  constructor(private http: HttpClient) { }

  get<T>(path: string) {
    return this.http.get<T>(`${this.domain + path}`);
  }

  post<T>(path: string, body: any) {
    return this.http.post<T>(`${this.domain + path}`, body);
  }
}
