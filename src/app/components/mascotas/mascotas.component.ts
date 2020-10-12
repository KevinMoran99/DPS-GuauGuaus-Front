import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pet } from '../../models/pet.model';
//from here we get the data
import { PetsService } from '../../services/pets.service';
import { MascotasDialogComponent } from './mascotas-dialog/mascotas-dialog.component';
//here are stored all our modal settings
import { ModalSettings } from '../../helpers/settings';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit {

  //columns to display in the table
  columnsToDisplay = ['name', 'specie', 'owner', 'state', 'edit'];
  //pet objects
  pet: Pet;
  pets: Pet[];

  constructor(
    private petsService: PetsService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getAll();
  }

  //we try to get all the pets from the API
  getAll(){
    this.petsService.getAll().subscribe(
      result => {
        this.pets = result as Pet[];
      }, error=>{
        if(error.status == 404){
          alert("Error al obtener los datos del servidor");
        }
      });
  }

  //opening the Add Pet Dialog
  openDialog(pet?: Pet): void {
    const dialogRef = this.dialog.open(MascotasDialogComponent, ModalSettings.especiesAddSettings);
    dialogRef.componentInstance.title = ModalSettings.mascotasAddSettings.title;
    if(pet != undefined){
      dialogRef.componentInstance.pet = pet;
    }
    dialogRef.afterClosed().subscribe(result => {
      dialogRef.componentInstance.isSending = false;
      this.getAll();
    });
  }
}
