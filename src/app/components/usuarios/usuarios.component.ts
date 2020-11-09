import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/user.model';
//from here we get the data
import { UsersService } from '../../services/users.service';
import { UsuariosDialogComponent } from './usuarios-dialog/usuarios-dialog.component';
//here are stored all our modal settings
import { ModalSettings } from '../../helpers/settings';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  //columns to display in the table
  columnsToDisplay = ['name', 'lastname', 'email', 'type_user', 'state'];
  //user objects
  user: User;
  users: MatTableDataSource<User>;

  //Usuario logeado
  loggedUser: User;
  //Variables que definen el acceso del usuario
  permCreate:Boolean = false;
  permUpdate:Boolean = false;
  permSched:Boolean  = false;
  permSpec:Boolean   = false;

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog) { }
    
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    //Auth
    this.user = JSON.parse(localStorage.getItem('auth'));
    if(this.user.permission.find(per => per.registro == "users").create) {
      this.permCreate = true;
    }
    if(this.user.permission.find(per => per.registro == "users").update) {
      this.permUpdate = true;
      this.columnsToDisplay.push('edit');
    }
    try {
      if(this.user.permission.find(per => per.registro == "schedules").read) {
        this.permSched = true;
        this.columnsToDisplay.push('schedules');
      }
    } catch{}
    try {
      if(this.user.permission.find(per => per.registro == "special").read) {
        this.permSpec = true;
        this.columnsToDisplay.push('specials');
      }
    } catch{}
    this.getAll();
  }

  //we try to get all the users from the API
  getAll(){
    this.usersService.getAll().subscribe(
      result => {
        this.users = new MatTableDataSource<User>(result as User[]);
        this.users.paginator = this.paginator;
      }, error=>{
        if(error.status == 404){
          alert("Error al obtener los datos del servidor");
        }
      });
  }

  //opening the Add User Dialog
  openDialog(user?: User): void {
    const dialogRef = this.dialog.open(UsuariosDialogComponent, ModalSettings.usuariosAddSettings);
    dialogRef.componentInstance.title = ModalSettings.usuariosAddSettings.title;
    if(user != undefined){
      dialogRef.componentInstance.user = user;
    }
    dialogRef.afterClosed().subscribe(result => {
      dialogRef.componentInstance.isSending = false;
      this.getAll();
    });
  }

}
