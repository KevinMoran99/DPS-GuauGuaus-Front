import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Schedule } from '../models/schedule.module';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  endpoint:string = "schedules"
  modifier:string = ""

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(environment.baseUrl+this.endpoint);
  }
  getActive(){
    this.modifier = "/active";
    return this.http.get(environment.baseUrl+this.endpoint+this.modifier);
  }
  post(schedule: Schedule) {
    return this.http.post(environment.baseUrl+this.endpoint,schedule);
  }

  put(schedule: Schedule){
    return this.http.put(environment.baseUrl+this.endpoint,schedule);
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
