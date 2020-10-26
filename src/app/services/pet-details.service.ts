import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PetDetail } from '../models/pet-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PetDetailsService {
  endpoint:string = "petdetails"
  modifier:string = "";

  constructor(
    private http: HttpClient
  ) { }

  getAllByPet(petId: number){
    this.modifier = "/pets/" + petId;
    return this.http.get(environment.baseUrl+this.endpoint+this.modifier);
  }
  getActiveByPet(petId: number){
    this.modifier = "/pets/active/" + petId;
    return this.http.get(environment.baseUrl+this.endpoint+this.modifier);
  }
  post(petDetail: PetDetail) {
    return this.http.post(environment.baseUrl+this.endpoint,petDetail);
  }

  put(petDetail: PetDetail){
    return this.http.put(environment.baseUrl+this.endpoint,petDetail);
  }
}
