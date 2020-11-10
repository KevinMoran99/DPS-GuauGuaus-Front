import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  endpoint:string = "appointments";
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
  byPet(id: Number){
    this.modifier = "/pet/";
    return this.http.get(environment.baseUrl+this.endpoint+this.modifier+id);
  }
  
  post(appointment: Appointment) {
    return this.http.post(environment.baseUrl+this.endpoint,appointment);
  }

  put(appointment: Appointment){
    
    return this.http.put(environment.baseUrl+this.endpoint,appointment);
  }
  
}
