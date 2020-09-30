import { Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Specie } from '../models/specie.model';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  endpoint:string = "species";

  constructor(
    private http: HttpClient 
    ){}
  
  getAll(){
    return this.http.get(environment.baseUrl+this.endpoint);
  }
  post(specie: Specie) {
    return this.http.post(environment.baseUrl+this.endpoint,specie);
  }

  put(specie: Specie){
    
    return this.http.put(environment.baseUrl+this.endpoint,specie);
  }
}
