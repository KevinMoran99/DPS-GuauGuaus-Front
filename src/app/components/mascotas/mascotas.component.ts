import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pet } from '../../models/pet.model';
//from here we get the data
import { PetsService } from '../../services/pets.service';
import { MascotasDialogComponent } from './mascotas-dialog/mascotas-dialog.component';
//here are stored all our modal settings
import { ModalSettings } from '../../helpers/settings';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit {
  
  //columns to display in the table
  columnsToDisplay = ['name', 'specie', 'owner', 'state'];
  //pet objects
  pet: Pet;
  pets: MatTableDataSource<Pet>;
  //petsOwner: Pet[];

  //Usuario logeado
  user: User;
  //Variables que definen el acceso del usuario
  permCreate:Boolean = false;
  permUpdate:Boolean = false;
  permCondit:Boolean = false;

  constructor(
    private petsService: PetsService,
    private dialog: MatDialog) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    //Auth
    this.user = JSON.parse(localStorage.getItem('auth'));
    if(this.user.permission.find(per => per.registro == "pets").create) {
      this.permCreate = true;
    }
    if(this.user.permission.find(per => per.registro == "pets").update) {
      this.permUpdate = true;
      this.columnsToDisplay.push('edit');
    }
    try {
      if(this.user.permission.find(per => per.registro == "pet_details").read) {
        this.permCondit = true;
        this.columnsToDisplay.push('conditions');
      }
    } catch{}
    this.getAll();
    //this.getByOwner();
  }
  /*
  getByOwner(){
    this.petsService.getByOwner(this.user.id).subscribe(
      result => {
        this.petsOwner = result as Pet[];
        console.log(this.petsOwner);
      }, error=>{
        if(error.status == 404){
          alert("Error al obtener los datos del servidor");
        }
      });
  }*/
  //we try to get all the pets from the API
  getAll(){
    this.petsService.getAll().subscribe(
      result => {
        this.pets = new MatTableDataSource<Pet>(result as Pet[]);
        this.pets.paginator = this.paginator;
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
    dialogRef.componentInstance.client = false;
    if(pet != undefined){
      dialogRef.componentInstance.pet = pet;
    }
    dialogRef.afterClosed().subscribe(result => {
      dialogRef.componentInstance.isSending = false;
      this.getAll();
    });
  }
}
