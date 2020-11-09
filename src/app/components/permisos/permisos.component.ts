import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Permission } from '../../models/permission';
import { User } from 'src/app/models/user.model';
//from here we get the data
import { PermissionsService } from '../../services/permissions.service';
import { PermisosDialogComponent } from './permisos-dialog/permisos-dialog.component';
//here are stored all our modal settings
import { ModalSettings } from '../../helpers/settings';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent implements OnInit {
 //columns to display in the table
 columnsToDisplay = ['registro', 'create', 'read', 'update', 'delete', 'type_user', 'state'];
 //user objects
 permission: Permission;
 permissions: MatTableDataSource<Permission>;

 //Usuario logeado
 user: User;
 //Variables que definen el acceso del usuario
 permCreate:Boolean = false;
 permUpdate:Boolean = false;

 constructor(
   private permissionsService: PermissionsService,
   private dialog: MatDialog) { }
   
 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

 ngOnInit() {
   //Auth
   this.user = JSON.parse(localStorage.getItem('auth'));
   if(this.user.permission.find(per => per.registro == "permissions").create) {
     this.permCreate = true;
   }
   if(this.user.permission.find(per => per.registro == "permissions").update) {
     this.permUpdate = true;
     this.columnsToDisplay.push('edit');
   }
   this.getAll();
 }

 //we try to get all the permissions from the API
 getAll(){
   this.permissionsService.getAll().subscribe(
     result => {
       this.permissions = new MatTableDataSource<Permission>(result as Permission[]);
       this.permissions.paginator = this.paginator;
     }, error=>{
       if(error.status == 404){
         alert("Error al obtener los datos del servidor");
       }
     });
 }

 //opening the Add permission Dialog
 openDialog(permission?: Permission): void {
   const dialogRef = this.dialog.open(PermisosDialogComponent, ModalSettings.permissionAddSettings);
   dialogRef.componentInstance.title = ModalSettings.permissionAddSettings.title;
   if(permission != undefined){
     dialogRef.componentInstance.permission = permission;
   }
   dialogRef.afterClosed().subscribe(result => {
     dialogRef.componentInstance.isSending = false;
     this.getAll();
   });
 }
}
