import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../shared/models/user.model';
import { IResponse } from '../shared/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'
  constructor(private http: HttpClient) { }

  register(user: IUser) {
    return this.http.post<IResponse>(`${this.apiUrl}/register`, user);
  }

  login(user: IUser) {
    return this.http.post<IResponse>(`${this.apiUrl}/login`, user);
  }

  protected() {
    return this.http.get(`${this.apiUrl}/protected`);
  }
}
