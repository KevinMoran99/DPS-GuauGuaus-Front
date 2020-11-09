import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
  byPet(id){
    this.modifier = "/pet/";
    return this.http.get(environment.baseUrl+this.endpoint+this.modifier)+id;
  }
  //TODO: make appointments model and implement in the functions below
  /*
  post(appointment: MedicalCondition) {
    return this.http.post(environment.baseUrl+this.endpoint,medicalCondition);
  }

  put(medicalCondition: MedicalCondition){
    
    return this.http.put(environment.baseUrl+this.endpoint,medicalCondition);
  }
  */
}
