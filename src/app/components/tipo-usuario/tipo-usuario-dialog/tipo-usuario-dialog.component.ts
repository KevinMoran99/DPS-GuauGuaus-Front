import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserType } from 'src/app/models/user-type.model';
import { UserTypesService } from 'src/app/services/user-types.service';

@Component({
  selector: 'app-tipo-usuario-dialog',
  templateUrl: './tipo-usuario-dialog.component.html',
  styleUrls: ['./tipo-usuario-dialog.component.css']
})
export class TipoUsuarioDialogComponent implements OnInit {

    //properties to be accesed by the dialog
    public title:string;
    userType = new UserType();
    isSending: boolean = false;
  
    //validating form
    userTypeForm: FormGroup = this.formBuilder.group({
      name: [, { validators: [Validators.required, Validators.minLength(3)], updateOn: "change" }],
      state: ["1", {validators: [Validators.required]}],
    });
  
    constructor(
      public dialogRef: MatDialogRef<TipoUsuarioDialogComponent>, 
      private formBuilder: FormBuilder,
      private userTypesService: UserTypesService,
      private _snackBar: MatSnackBar) { }
  
    ngOnInit(): void {
      //if comes from edit
      if(this.userType.id != undefined){
        this.userTypeForm.controls['name'].setValue(this.userType.name);
        this.userTypeForm.controls['state'].setValue(this.userType.state ? '1' : '0');
      }
    }
    
    onNoClick(): void {
      //this.dialogRef.close();
    }
    //TO-DO: Handle POST 
    send(){
      this.isSending = true;
      //updating object
      this.userType.name = this.userTypeForm.controls['name'].value;
      this.userType.state = this.userTypeForm.controls['state'].value;
  
      if(this.userType.id == undefined){
        //post
        this.userTypesService.post(this.userType).subscribe(
          result => {
            this.openSnackBar("Ingresado con éxito", "Cerrar");
            this.dialogRef.close();
        },
        error=>{
          this.openSnackBar("Ocurrió un error al ingresar el tipo de usuario", "Cerrar");
        }
        );
      }else{
        //put
        this.userTypesService.put(this.userType).subscribe(
          result => {
            this.openSnackBar("Actualizado con éxito", "Cerrar");
            this.dialogRef.close();
            
        },
        error=>{
          console.log(error);
          this.openSnackBar("Ocurrio un error al actualizar el tipo de usuario", "Cerrar");
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
