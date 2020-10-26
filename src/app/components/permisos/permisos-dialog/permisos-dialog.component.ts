import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//imports to post/put
import { Permission } from 'src/app/models/permission';
import { PermissionsService } from 'src/app/services/permissions.service';
import { UserType } from 'src/app/models/user-type.model';
import { UserTypesService } from 'src/app/services/user-types.service';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-permisos-dialog',
  templateUrl: './permisos-dialog.component.html',
  styleUrls: ['./permisos-dialog.component.css']
})
export class PermisosDialogComponent implements OnInit {

  //properties to be accesed by the dialog
  public title:string;
  permission = new Permission();
  isSending: boolean = false;

  //Validating form
  permissionForm: FormGroup = this.formBuilder.group({
    registro: [, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(25)], updateOn: "change" }],
    create: ["1", {validators: [Validators.required]}],
    read: ["1", {validators: [Validators.required]}],
    update: ["1", {validators: [Validators.required]}],
    delete: ["1", {validators: [Validators.required]}],
    users_types_id: [, {validators: [Validators.required]}],
    state: ["1", {validators: [Validators.required]}],
  });

  userTypes: UserType[];

  constructor(
    public dialogRef: MatDialogRef<PermisosDialogComponent>, 
    private formBuilder: FormBuilder,
    private permissionsService: PermissionsService,
    private userTypesService: UserTypesService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    //populating selects
    this.userTypesService.getActive().subscribe(
      result => {
        this.userTypes = result as UserType[];
      }, error=>{
        if(error.status == 404){
          alert("Error al obtener los datos del servidor");
        }
      });

    //if comes from edit
    if(this.permission.id != undefined){
      this.permissionForm.controls['registro'].setValue(this.permission.registro);
      this.permissionForm.controls['create'].setValue(this.permission.create ? '1' : '0');
      this.permissionForm.controls['read'].setValue(this.permission.read ? '1' : '0');
      this.permissionForm.controls['update'].setValue(this.permission.update ? '1' : '0');
      this.permissionForm.controls['delete'].setValue(this.permission.delete ? '1' : '0');
      this.permissionForm.controls['users_types_id'].setValue(this.permission.users_types_id);
      this.permissionForm.controls['state'].setValue(this.permission.state ? '1' : '0');
    }
  }

  send(){
    this.isSending = true;
    //updating object
    this.permission.registro = this.permissionForm.controls['registro'].value;
    this.permission.create = this.permissionForm.controls['create'].value;
    this.permission.read = this.permissionForm.controls['read'].value;
    this.permission.update = this.permissionForm.controls['update'].value;
    this.permission.delete = this.permissionForm.controls['delete'].value;
    this.permission.users_types_id = this.permissionForm.controls['users_types_id'].value;
    this.permission.state = this.permissionForm.controls['state'].value;


    if(this.permission.id == undefined){
      //post
      console.log(this.permission);
      this.permissionsService.post(this.permission).subscribe(
        result => {
          this.openSnackBar("Ingresado con éxito", "Cerrar");
          this.dialogRef.close();
      },
      error=>{
        this.openSnackBar("Ocurrió un error al ingresar el permiso", "Cerrar");
      }
      );
    }else{
      //put
      this.permissionsService.put(this.permission).subscribe(
        result => {
          this.openSnackBar("Actualizado con éxito", "Cerrar");
          this.dialogRef.close();
          
      },
      error=>{
        this.openSnackBar("Ocurrio un error al actualizar el permiso", "Cerrar");
      }
      );
    }
  }
  //exit the modal
  close(){
    this.dialogRef.close();
  }
  //send a toast
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
