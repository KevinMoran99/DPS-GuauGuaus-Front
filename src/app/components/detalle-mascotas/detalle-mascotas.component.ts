import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pet } from 'src/app/models/pet.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-detalle-mascotas',
  templateUrl: './detalle-mascotas.component.html',
  styleUrls: ['./detalle-mascotas.component.css'],
  providers:[DatePipe]
})
export class DetalleMascotasComponent implements OnInit {
  
  pet: Pet;
  columns: Number;
  constructor(
    private sharedService: SharedService,
    private router:Router,
    public datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.columns = (window.innerWidth <= 850) ? 1 : 4;
    this.getPet();
  }
  
  getPet(){
    this.pet = this.sharedService.sharedObject as Pet;
    if(this.pet == undefined){
      this.router.navigate(['/']);
    }
    console.log(this.pet);
  }
  onResize(event) {
    this.columns = (event.target.innerWidth <= 850) ? 1 : 4;
  }
}
