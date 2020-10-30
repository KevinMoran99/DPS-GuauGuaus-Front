import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Special } from '../models/special';

@Injectable({
  providedIn: 'root'
})
export class SpecialsService {

  endpoint:string = "specials"
  modifier:string = ""

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(environment.baseUrl+this.endpoint);
  }
  getActive(){
    this.modifier = "/active";
    return this.http.get(environment.baseUrl+this.endpoint+this.modifier);
  }
  post(special: Special) {
    return this.http.post(environment.baseUrl+this.endpoint,special);
  }

  put(special: Special){
    return this.http.put(environment.baseUrl+this.endpoint,special);
  }
  getAllByUser(userId: number){
    this.modifier = "/doctor/" + userId;
    return this.http.get(environment.baseUrl+this.endpoint+this.modifier);
  }
  getActiveByUser(userId: number){
    this.modifier = "/doctor/active/" + userId;
    return this.http.get(environment.baseUrl+this.endpoint+this.modifier);
  }
}
