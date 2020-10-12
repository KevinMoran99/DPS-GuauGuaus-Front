import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//imports to post/put
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
//import { TypeUser } from 'src/app/models/typeUser.model';
//import { TypeUserService } from 'src/app/services/typeUser.service';

@Component({
  selector: 'app-usuarios-dialog',
  templateUrl: './usuarios-dialog.component.html',
  styleUrls: ['./usuarios-dialog.component.css']
})
export class UsuariosDialogComponent implements OnInit {

  //properties to be accesed by the dialog
  public title:string;
  user = new User();
  isSending: boolean = false;

  //Validating form
  userForm: FormGroup = this.formBuilder.group({
    name: [, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(25)], updateOn: "change" }],
    lastname: [, {validators: [Validators.required]}],
    email: [, {validators: [Validators.required, Validators.email]}],
    password: [, {validators: [Validators.required]}],
    passwordConfirm: [, {validators: [Validators.required]}],
    dui: [, {validators: [Validators.required]}],
    address: [, {validators: [Validators.required]}],
    phone: [, {validators: [Validators.required]}],
    state: ["1", {validators: [Validators.required]}],
    type_user_id: [, {validators: [Validators.required]}],
  });

  //typeUser: typeUser[];
  typeUser: Object[];

  constructor(
    public dialogRef: MatDialogRef<UsuariosDialogComponent>, 
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    //private typeUsersService: TypeUsersService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    //populating selects
    /*this.typeUsersService.getAll().subscribe(
      result => {
        this.typeUser = result as TypeUser[];
      }, error=>{
        if(error.status == 404){
          alert("Error al obtener los datos de tipos de usuario del servidor");
      }
    });*/

    //if comes from edit
    if(this.user.id != undefined){
      this.userForm.controls['name'].setValue(this.user.name);
      this.userForm.controls['lastname'].setValue(this.user.lastname);
      this.userForm.controls['email'].setValue(this.user.email);
      this.userForm.controls['dui'].setValue(this.user.dui);
      this.userForm.controls['address'].setValue(this.user.address);
      this.userForm.controls['phone'].setValue(this.user.phone);
      this.userForm.controls['state'].setValue(this.user.state ? '1' : '0');
      this.userForm.controls['type_user_id'].setValue(this.user.type_user_id);
    }
  }

  send(){
    this.isSending = true;
    //updating object
    this.user.name = this.userForm.controls['name'].value;
    this.user.lastname = this.userForm.controls['lastname'].value;
    this.user.email = this.userForm.controls['email'].value;
    this.user.dui = this.userForm.controls['dui'].value;
    this.user.address = this.userForm.controls['address'].value;
    this.user.phone = this.userForm.controls['phone'].value;
    this.user.password = this.userForm.controls['phone'].value;
    this.user.state = this.userForm.controls['state'].value;
    this.user.type_user_id = this.userForm.controls['type_user_id'].value;

    if(this.user.id == undefined){
      //post
      this.usersService.post(this.user).subscribe(
        result => {
          this.openSnackBar("Ingresado con éxito", "Cerrar");
          this.dialogRef.close();
      },
      error=>{
        this.openSnackBar("Ocurrió un error al ingresar el usuario", "Cerrar");
      }
      );
    }else{
      //put
      this.usersService.put(this.user).subscribe(
        result => {
          this.openSnackBar("Actualizado con éxito", "Cerrar");
          this.dialogRef.close();
          
      },
      error=>{
        this.openSnackBar("Ocurrio un error al actualizar el usuario", "Cerrar");
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
