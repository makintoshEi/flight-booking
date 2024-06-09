import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }

  get<T>(path: string) {
    return this.http.get<T>(path);
  }

  post<T>(path: string, body: any) {
    return this.http.post<T>(path, body);
  }
}
