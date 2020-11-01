import { Component, OnInit, ViewChild } from '@angular/core';
import { Pet } from '../../models/pet.model';
//from here we get the data
import { PetsService } from '../../services/pets.service';
import { User } from 'src/app/models/user.model';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MascotasDialogComponent } from '../mascotas/mascotas-dialog/mascotas-dialog.component';
import { ModalSettings } from 'src/app/helpers/settings';

@Component({
  selector: 'app-mis-mascotas',
  templateUrl: './mis-mascotas.component.html',
  styleUrls: ['./mis-mascotas.component.css']
})
export class MisMascotasComponent implements OnInit {
  restImg:string;
  defaultImage: string = "assets/img/default.png"
  columns: Number;
  user: User;
  //pet objects
  pet: Pet;
  pets: Pet[];

  constructor(
    private petsService: PetsService,
    private dialog: MatDialog) { }


  ngOnInit() {
    this.columns = (window.innerWidth <= 850) ? 1 : 4;
    this.user = JSON.parse(localStorage.getItem('auth'));
    this.getByOwner();
  }
  getByOwner(){
    this.petsService.getByOwner(this.user.id).subscribe(
      result => {
        this.pets = result as Pet[];
        console.log(this.pets);
      }, error=>{
        if(error.status == 404){
          alert("No tiene mascotas registradas, registre una para continuar");
        }
      });
  }

  onResize(event) {
    this.columns = (event.target.innerWidth <= 850) ? 1 : 4;
  }

  petDetails(pet){
    console.log(pet as Pet);
  }

    //opening the Add Pet Dialog
    openDialog(pet?: Pet): void {
      const dialogRef = this.dialog.open(MascotasDialogComponent, ModalSettings.especiesAddSettings);
      dialogRef.componentInstance.title = ModalSettings.mascotasAddSettings.title;
      dialogRef.componentInstance.client = true;
      if(pet != undefined){
        dialogRef.componentInstance.pet = pet;
      }
      dialogRef.afterClosed().subscribe(result => {
        dialogRef.componentInstance.isSending = false;
        this.getByOwner();
      });
    }
  }

