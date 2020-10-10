import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppointmentTypes } from 'src/app/models/appointment-types.model';
import { AppointmentTypesService } from 'src/app/services/appointment-types.service';

@Component({
  selector: 'app-tipos-cita-dialog',
  templateUrl: './tipos-cita-dialog.component.html',
  styleUrls: ['./tipos-cita-dialog.component.css']
})
export class TiposCitaDialogComponent implements OnInit {

  //properties to be accesed by the dialog
  public title:string;
  appointmentType = new AppointmentTypes();
  isSending: boolean = false;

  //validating form
  appointmentTypesForm: FormGroup = this.formBuilder.group({
    name: [, { validators: [Validators.required, Validators.minLength(3)], updateOn: "change" }],
    duration: [0, {validators:[Validators.required, Validators.min(0)], updateOn: "change"}],
    state: ["1", {validators: [Validators.required]}],
  });

  constructor(
    public dialogRef: MatDialogRef<TiposCitaDialogComponent>, 
    private formBuilder: FormBuilder,
    private appointmentTypesService: AppointmentTypesService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //if comes from edit
    if(this.appointmentType.id != undefined){
      this.appointmentTypesForm.controls['name'].setValue(this.appointmentType.name);
      this.appointmentTypesForm.controls['duration'].setValue(this.appointmentType.duration);
      this.appointmentTypesForm.controls['state'].setValue(this.appointmentType.state ? '1' : '0');
    }
  }
  
  onNoClick(): void {
    //this.dialogRef.close();
  }
  //TO-DO: Handle POST 
  send(){
    this.isSending = true;
    //updating object
    this.appointmentType.name = this.appointmentTypesForm.controls['name'].value;
    this.appointmentType.duration = this.appointmentTypesForm.controls['duration'].value;
    this.appointmentType.state = this.appointmentTypesForm.controls['state'].value;

    if(this.appointmentType.id == undefined){
      //post
      this.appointmentTypesService.post(this.appointmentType).subscribe(
        result => {
          this.openSnackBar("Ingresado con éxito", "Cerrar");
          this.dialogRef.close();
      },
      error=>{
        this.openSnackBar("Ocurrió un error al ingresar el tipo de cita", "Cerrar");
      }
      );
    }else{
      //put
      this.appointmentTypesService.put(this.appointmentType).subscribe(
        result => {
          this.openSnackBar("Actualizado con éxito", "Cerrar");
          this.dialogRef.close();
          
      },
      error=>{
        this.openSnackBar("Ocurrio un error al actualizar el tipo de cita", "Cerrar");
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
