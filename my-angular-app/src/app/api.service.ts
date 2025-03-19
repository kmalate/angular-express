import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {  
  private apiUrl = 'http://localhost:3000/tasks'
  constructor(private http: HttpClient) { }
  // getMessage() {
  //   return this.http.get(`${this.apiUrl}`);
  // }
  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  createTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }
  // Implement other CRUD operations (GET by ID, PUT, DELETE)
}
