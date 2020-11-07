import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//imports to post/put
import { Special } from 'src/app/models/special';
import { SpecialsService } from 'src/app/services/specials.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-asuedoc-dialog',
  templateUrl: './asuedoc-dialog.component.html',
  styleUrls: ['./asuedoc-dialog.component.css']
})
export class AsuedocDialogComponent implements OnInit {

 //properties to be accesed by the dialog
 public title:string;
 special= new Special();
 userId: number;
 isSending: boolean = false;

 //Validating form
 specialForm: FormGroup = this.formBuilder.group({
   day: [, {validators: [Validators.required]}],
   start_hour: [, {validators: [Validators.required]}],
   finish_hour: [, {validators: [Validators.required]}],
   state: ["1", {validators: [Validators.required]}],
 });

 maxDate: Date = new Date();
 user: User[];

 constructor(
   public dialogRef: MatDialogRef<AsuedocDialogComponent>, 
   private formBuilder: FormBuilder,
   private specialsService: SpecialsService,
   private usersService: UsersService,
   private _snackBar: MatSnackBar,
   private cdr: ChangeDetectorRef
 ) { }

 ngOnInit(): void {

   //populating selects
   this.usersService.getActive().subscribe(
     result => {
       this.user = result as User[];
     }, error=>{
       if(error.status == 404){
         alert("Error al obtener los datos de los doctores");
     }
   });

   //if comes from edit
   if(this.special.id != undefined){
     this.specialForm.controls['day'].setValue(this.special.day);
     this.specialForm.controls['start_hour'].setValue(this.special.start_hour);
     this.specialForm.controls['finish_hour'].setValue(this.special.finish_hour);
     this.specialForm.controls['state'].setValue(this.special.state ? '1' : '0');
   }
 }


 send(){
   this.isSending = true;
   //updating object
   this.special.doctor_id = this.userId;
   try {
    this.special.day = (this.specialForm.controls['day'].value).toISOString().slice(0,10);
  }
  catch {
    this.special.day = this.specialForm.controls['day'].value;
  }
   this.special.start_hour = this.specialForm.controls['start_hour'].value;
   this.special.finish_hour = this.specialForm.controls['finish_hour'].value;
   this.special.state = this.specialForm.controls['state'].value;
   

   if(this.special.id == undefined){
     //post
     this.specialsService.post(this.special).subscribe(
       result => {
         this.openSnackBar("Ingresado con éxito", "Cerrar");
         this.dialogRef.close();
     },
     error=>{
       this.openSnackBar("Ocurrió un error al ingresar el horario", "Cerrar");
       this.dialogRef.close();
       console.log(this.special);
     }
     );
   }else{
     //put
     this.specialsService.put(this.special).subscribe(
       result => {
         this.openSnackBar("Actualizado con éxito", "Cerrar");
         this.dialogRef.close();
         
     },
     error=>{
       this.openSnackBar("Ocurrio un error al actualizar el horario", "Cerrar");
       this.dialogRef.close();
       console.log(this.special);
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
