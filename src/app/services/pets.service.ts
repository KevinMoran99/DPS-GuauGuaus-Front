import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  endpoint:string = "pets"

  constructor(
    private http: HttpClient
  ) { }

  getAll(){
    return this.http.get(environment.baseUrl+this.endpoint);
  }
  post(pet: Pet) {
    return this.http.post(environment.baseUrl+this.endpoint,pet);
  }

  put(pet: Pet){
    
    return this.http.put(environment.baseUrl+this.endpoint,pet);
  }
}