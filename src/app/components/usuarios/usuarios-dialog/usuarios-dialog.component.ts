import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//imports to post/put
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { UserType } from 'src/app/models/user-type.model';
import { UserTypesService } from 'src/app/services/user-types.service';
import { isEmpty } from 'rxjs/operators';

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

  isRegisterUser = false;
  isEditProfile = false;

  //Validating form
  userForm: FormGroup = this.formBuilder.group({
    name: [, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)], updateOn: "change" }],
    lastname: [, {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]}],
    email: [, {validators: [Validators.required, Validators.email, Validators.maxLength(50)]}],
    password: [, {validators: [Validators.minLength(4)]}],
    passwordConfirm: [, {validators: [Validators.minLength(4)]}],
    dui: [, {validators: [Validators.required]}],
    address: [, {validators: [Validators.required, Validators.minLength(5)]}],
    phone: [, {validators: [Validators.required]}],
    type_user_id: [, {validators: []}],
    state: ["1", {validators: []}],
  });

  userTypes: UserType[];

  constructor(
    public dialogRef: MatDialogRef<UsuariosDialogComponent>, 
    private formBuilder: FormBuilder,
    private usersService: UsersService,
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
    this.user.password = this.userForm.controls['password'].value;
    this.user.state = this.userForm.controls['state'].value;
    this.user.type_user_id = this.userForm.controls['type_user_id'].value;

    //Validando que se haya ingresado la contraseña (no se valida con Validators porque esta
    //validación no aplica para edit)
    if (this.user.id == undefined) {
      if (this.userForm.controls['password'].value == null) {
        this.openSnackBar("Debe proporcionar una contraseña", "Cerrar");
        this.isSending = false;
        return;
      }
    }

    //Validando que las contraseñas coincidan
    if (this.userForm.controls['password'].value != this.userForm.controls['passwordConfirm'].value) {
      this.openSnackBar("Las contraseñas ingresadas no coinciden", "Cerrar");
      this.isSending = false;
      return;
    }

    //Validando que se haya ingresado el tipo y estado (no se valida con Validators porque esta
    //validación no aplica para register)
    if (!(this.isRegisterUser)) {
      if (this.userForm.controls['type_user_id'].value == null) {
        this.openSnackBar("Debe proporcionar un tipo de usuario", "Cerrar");
        this.isSending = false;
        return;
      }
      if (this.userForm.controls['state'].value == null) {
        this.openSnackBar("Debe proporcionar un estado", "Cerrar");
        this.isSending = false;
        return;
      }
    }

    if(this.user.id == undefined){
      //post
      if (this.isRegisterUser) {
        this.usersService.register(this.user).subscribe(
          result => {
            this.openSnackBar("Te has registrado! Ahora, inicia sesión.", "Cerrar");
            this.dialogRef.close();
        },
        error=>{
          this.openSnackBar("Ocurrió un error al ingresar el usuario", "Cerrar");
        }
        );
      }
      else {
        this.usersService.post(this.user).subscribe(
          result => {
            this.openSnackBar("Ingresado con éxito", "Cerrar");
            this.dialogRef.close();
        },
        error=>{
          this.openSnackBar("Ocurrió un error al ingresar el usuario", "Cerrar");
        }
        );
      }
    }else{
      //put
      if (this.isEditProfile) {
        this.usersService.updateProfile(this.user).subscribe(
          result => {
            this.openSnackBar("Actualizado con éxito", "Cerrar");
            this.dialogRef.close();
            
        },
        error=>{
          this.openSnackBar("Ocurrio un error al actualizar el usuario", "Cerrar");
        }
        );  
      }
      else {
        
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
