import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalSettings } from 'src/app/helpers/settings';
import { UserType } from 'src/app/models/user-type.model';
import { UserTypesService } from 'src/app/services/user-types.service';
import { TipoUsuarioDialogComponent } from './tipo-usuario-dialog/tipo-usuario-dialog.component';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.css']
})
export class TipoUsuarioComponent implements OnInit {

    //columns to display in the table
    columnsToDisplay = ['name', 'state', 'edit'];
    //specie objects
    userType: UserType;
    userTypes: UserType[];
  
    constructor(
      private userTypesService: UserTypesService,
      private dialog: MatDialog,) { }
  
    ngOnInit(){
      this.getAll();
    }
  
    //we try to get all the species from the API
    getAll(){
      this.userTypesService.getAll().subscribe(
        result => {
          this.userTypes = result as UserType[];
        }, error=>{
          if(error.status == 404){
            alert("Error al obtener los datos del servidor");
          }
        });
    }

    /* GET ACTIVE USER-TYPES METHOD */
    /*
    getActive(){
      this.userTypesService.getActive().subscribe(
        result => {
          this.userTypes = result as UserType[];
        }, error=>{
          if(error.status == 404){
            alert("Error al obtener los datos del servidor");
          }
        });
    }*/
  
    //opening the Add Specie Dialog
    openDialog(userType?: UserType): void {
      const dialogRef = this.dialog.open(TipoUsuarioDialogComponent, ModalSettings.especiesAddSettings);
      dialogRef.componentInstance.title = ModalSettings.especiesAddSettings.title;
      if(userType != undefined){
        dialogRef.componentInstance.userType = userType;
      }
      dialogRef.afterClosed().subscribe(result => {
        dialogRef.componentInstance.isSending = false;
        this.getAll();
      });
    }

}
