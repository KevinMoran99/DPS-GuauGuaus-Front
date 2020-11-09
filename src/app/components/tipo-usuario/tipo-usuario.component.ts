import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalSettings } from 'src/app/helpers/settings';
import { UserType } from 'src/app/models/user-type.model';
import { User } from 'src/app/models/user.model';
import { UserTypesService } from 'src/app/services/user-types.service';
import { TipoUsuarioDialogComponent } from './tipo-usuario-dialog/tipo-usuario-dialog.component';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.css']
})
export class TipoUsuarioComponent implements OnInit {

    //columns to display in the table
    columnsToDisplay = ['name', 'state'];
    //specie objects
    userType: UserType;
    userTypes: MatTableDataSource<UserType>;

    //Usuario logeado
    user: User;
    //Variables que definen el acceso del usuario
    permCreate:Boolean = false;
    permUpdate:Boolean = false;
  
    constructor(
      private userTypesService: UserTypesService,
      private dialog: MatDialog,) { }
      
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
    ngOnInit(){
      //Auth
      this.user = JSON.parse(localStorage.getItem('auth'));
      if(this.user.permission.find(per => per.registro == "users_types").create) {
        this.permCreate = true;
      }
      if(this.user.permission.find(per => per.registro == "users_types").update) {
        this.permUpdate = true;
        this.columnsToDisplay.push('edit');
      }
      this.getAll();
    }
  
    //we try to get all the species from the API
    getAll(){
      this.userTypesService.getAll().subscribe(
        result => {
          this.userTypes = new MatTableDataSource<UserType>(result as UserType[]);
          this.userTypes.paginator = this.paginator;
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
      const dialogRef = this.dialog.open(TipoUsuarioDialogComponent, ModalSettings.tipoUsuarioAddSettings);
      dialogRef.componentInstance.title = ModalSettings.tipoUsuarioAddSettings.title;
      if(userType != undefined){
        dialogRef.componentInstance.userType = userType;
      }
      dialogRef.afterClosed().subscribe(result => {
        dialogRef.componentInstance.isSending = false;
        this.getAll();
      });
    }

}
