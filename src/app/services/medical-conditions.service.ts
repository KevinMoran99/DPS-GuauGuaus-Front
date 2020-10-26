import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MedicalCondition } from '../models/medical-condition.model';

@Injectable({
  providedIn: 'root'
})
export class MedicalConditionsService {

  endpoint:string = "medicalconditions";
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
  post(medicalCondition: MedicalCondition) {
    return this.http.post(environment.baseUrl+this.endpoint,medicalCondition);
  }

  put(medicalCondition: MedicalCondition){
    
    return this.http.put(environment.baseUrl+this.endpoint,medicalCondition);
  }
}
