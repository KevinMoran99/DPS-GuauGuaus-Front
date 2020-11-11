import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Permission } from '../models/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  endpoint:string = "permissions"
  modifier:string = ""

  constructor(
    private http: HttpClient
  ) { }

  getAll(){
    return this.http.get(environment.baseUrl+this.endpoint);
  }
  get(id: Number) {
    return this.http.get(environment.baseUrl+this.endpoint+'/'+id);
  }
  getByType(id: Number){
    this.modifier = "/users/";
    return this.http.get(environment.baseUrl+this.endpoint+this.modifier+id);
  }
  getActive(){
    this.modifier = "/active";
    return this.http.get(environment.baseUrl+this.endpoint+this.modifier);
  }
  post(permission: Permission) {
    return this.http.post(environment.baseUrl+this.endpoint,permission);
  }

  put(permission: Permission){
    return this.http.put(environment.baseUrl+this.endpoint,permission);
  }
}
