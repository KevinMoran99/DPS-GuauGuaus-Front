import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicalCondition } from 'src/app/models/medical-condition.model';
import { MedicalConditionsService } from 'src/app/services/medical-conditions.service';

@Component({
  selector: 'app-condicion-medica-dialog',
  templateUrl: './condicion-medica-dialog.component.html',
  styleUrls: ['./condicion-medica-dialog.component.css']
})
export class CondicionMedicaDialogComponent implements OnInit {

    //properties to be accesed by the dialog
    public title:string;
    medicalCondition = new MedicalCondition();
    isSending: boolean = false;
  
    //validating form
    medicalConditionForm: FormGroup = this.formBuilder.group({
      name: [, { validators: [Validators.required, Validators.minLength(3)], updateOn: "change" }],
      state: ["1", {validators: [Validators.required]}],
    });
  
    constructor(
      public dialogRef: MatDialogRef<CondicionMedicaDialogComponent>, 
      private formBuilder: FormBuilder,
      private medicalConditionService: MedicalConditionsService,
      private _snackBar: MatSnackBar) { }
  
    ngOnInit(): void {
      //if comes from edit
      if(this.medicalCondition.id != undefined){
        this.medicalConditionForm.controls['name'].setValue(this.medicalCondition.name);
        this.medicalConditionForm.controls['state'].setValue(this.medicalCondition.state ? '1' : '0');
      }
    }
    
    onNoClick(): void {
      //this.dialogRef.close();
    }
    //TO-DO: Handle POST 
    send(){
      this.isSending = true;
      //updating object
      this.medicalCondition.name = this.medicalConditionForm.controls['name'].value;
      this.medicalCondition.state = this.medicalConditionForm.controls['state'].value;
  
      if(this.medicalCondition.id == undefined){
        //post
        this.medicalConditionService.post(this.medicalCondition).subscribe(
          result => {
            this.openSnackBar("Ingresado con éxito", "Cerrar");
            this.dialogRef.close();
        },
        error=>{
          this.openSnackBar("Ocurrió un error al ingresar la condicion medica", "Cerrar");
        }
        );
      }else{
        //put
        this.medicalConditionService.put(this.medicalCondition).subscribe(
          result => {
            this.openSnackBar("Actualizado con éxito", "Cerrar");
            this.dialogRef.close();
            
        },
        error=>{
          this.openSnackBar("Ocurrio un error al actualizar la condicion medica", "Cerrar");
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
