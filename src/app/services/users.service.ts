import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  endpoint:string = "users"

  constructor(
    private http: HttpClient
  ) { }

  getAll(){
    return this.http.get(environment.baseUrl+this.endpoint);
  }
  post(user: User) {
    return this.http.post(environment.baseUrl+this.endpoint,user);
  }

  put(user: User){
    return this.http.put(environment.baseUrl+this.endpoint,user);
  }
}
