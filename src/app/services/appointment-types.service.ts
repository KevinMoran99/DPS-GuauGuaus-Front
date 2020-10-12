import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AppointmentTypes } from '../models/appointment-types.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentTypesService {

  endpoint:string = "appointmenttypes";

  constructor(
    private http: HttpClient 
    ){}
  
  getAll(){
    return this.http.get(environment.baseUrl+this.endpoint);
  }
  post(appointmentType: AppointmentTypes) {
    return this.http.post(environment.baseUrl+this.endpoint,appointmentType);
  }

  put(appointmentType: AppointmentTypes){
    
    return this.http.put(environment.baseUrl+this.endpoint,appointmentType);
  }
}
