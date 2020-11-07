import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-detalle-mascotas',
  templateUrl: './detalle-mascotas.component.html',
  styleUrls: ['./detalle-mascotas.component.css']
})
export class DetalleMascotasComponent implements OnInit {
  
  pet: Pet;
  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getPet();
  }
  
  getPet(){
    this.pet = this.sharedService.sharedObject as Pet;
    console.log(this.pet);
  }
}
