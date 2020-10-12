import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserType } from '../models/user-type.model';

@Injectable({
  providedIn: 'root'
})
export class UserTypesService {

  endpoint:string = "usertypes";
  modifier:string = "";

  constructor(
    private http: HttpClient 
    ){}
  
  getAll(){
    return this.http.get(environment.baseUrl+this.endpoint);
  }
  getActive(){
    this.modifier = "/active";
    return this.http.get(environment.baseUrl+this.endpoint+this.modifier);
  }
  post(userType: UserType) {
    return this.http.post(environment.baseUrl+this.endpoint,userType);
  }

  put(userType: UserType){
    
    return this.http.put(environment.baseUrl+this.endpoint,userType);
  }
}
