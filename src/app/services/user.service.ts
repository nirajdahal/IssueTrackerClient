import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RegisterUser } from '../models/User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly BaseURI = 'https://localhost:44392/api';
  registerUser:RegisterUser;
  constructor(private http: HttpClient) { }
  register(data:RegisterUser) {
    return this.http.post(this.BaseURI + '/user/register', data);
  }
}
