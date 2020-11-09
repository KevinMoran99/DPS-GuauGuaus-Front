import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalSettings } from '../../../helpers/settings';
import { User } from '../../../models/user.model';
import { UsersService } from '../../../services/users.service';
import { SpecialsService } from '../../../services/specials.service';
import { Special } from 'src/app/models/special';
import { AsuedocDialogComponent } from './asuedoc-dialog/asuedoc-dialog.component';

@Component({
  selector: 'app-asuetos-doctores',
  templateUrl: './asuetos-doctores.component.html',
  styleUrls: ['./asuetos-doctores.component.css']
})
export class AsuetosDoctoresComponent implements OnInit {

  //columns to display in the table
  columnsToDisplay = ['day', 'start_hour', 'finish_hour', 'state'];
  //current objects
  user: User;
  specials: MatTableDataSource<Special>;
  
  //Usuario logeado
  loggedUser: User;
  //Variables que definen el acceso del usuario
  permCreate:Boolean = false;
  permUpdate:Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private specialsService: SpecialsService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    //Auth
    this.user = JSON.parse(localStorage.getItem('auth'));
    if(this.user.permission.find(per => per.registro == "special").create) {
      this.permCreate = true;
    }
    if(this.user.permission.find(per => per.registro == "special").update) {
      this.permUpdate = true;
      this.columnsToDisplay.push('edit');
    }

    this.route.paramMap.subscribe(params => {
      let id = +params.get('userId');
      this.usersService.get(id).subscribe(
        result => {
          this.user = result as User;
          this.getAll();
        }, error=>{
          if(error.status == 404){
            alert("Error al obtener los datos del doctor en el servidor");
          }
        });
    });
    
  }

  //we try to get all the users from the API
 getAll(){
  this.specialsService.getAllByUser(this.user.id).subscribe(
    result => {
      this.specials = new MatTableDataSource<Special>(result as Special[]);
      this.specials.paginator = this.paginator;
    }, error=>{
      if(error.status == 404){
        this.openSnackBar(this.user.name + ' aún no tiene horarios asignados.', 'Cerrar');
      }
      else {
        alert('Ocurrió un error inesperado.');
      }
    });
  }

  //opening the Add Detail Dialog
  openDialog(special?: Special): void {
    const dialogRef = this.dialog.open(AsuedocDialogComponent, ModalSettings.SpecialAddSettings);
    dialogRef.componentInstance.title = ModalSettings.SpecialAddSettings.title;
    dialogRef.componentInstance.userId = this.user.id;
    if(special != undefined){
      dialogRef.componentInstance.special = special;
    }
    dialogRef.afterClosed().subscribe(result => {
      dialogRef.componentInstance.isSending = false;
      this.getAll();
    });
  }

  //send a toast
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
