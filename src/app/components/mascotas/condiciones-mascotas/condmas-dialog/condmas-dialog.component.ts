import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//imports to post/put
import { PetDetail } from 'src/app/models/pet-detail.model';
import { PetDetailsService } from 'src/app/services/pet-details.service';
import { MedicalCondition } from 'src/app/models/medical-condition.model';
import { MedicalConditionsService } from 'src/app/services/medical-conditions.service';

@Component({
  selector: 'app-condmas-dialog',
  templateUrl: './condmas-dialog.component.html',
  styleUrls: ['./condmas-dialog.component.css']
})
export class CondmasDialogComponent implements OnInit {

  //properties to be accesed by the dialog
  public title:string;
  detail = new PetDetail();
  petId: number;
  isSending: boolean = false;

  //Validating form
  detailForm: FormGroup = this.formBuilder.group({
    codition_id: [, {validators: [Validators.required]}],
    observations: [, { validators: [Validators.required, Validators.minLength(10), Validators.maxLength(1000)], updateOn: "change" }],
    state: ["1", {validators: [Validators.required]}],
  });

  conditions: MedicalCondition[];

  constructor(
    public dialogRef: MatDialogRef<CondmasDialogComponent>, 
    private formBuilder: FormBuilder,
    private petDetailsService: PetDetailsService,
    private conditionService: MedicalConditionsService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    //populating selects
    this.conditionService.getActive().subscribe(
      result => {
        this.conditions = result as MedicalCondition[];
      }, error=>{
        if(error.status == 404){
          alert("Error al obtener los datos de condiciones médicas del servidor");
      }
    });

    //if comes from edit
    if(this.detail.id != undefined){
      this.detailForm.controls['codition_id'].setValue(this.detail.codition_id);
      this.detailForm.controls['observations'].setValue(this.detail.observations);
      this.detailForm.controls['state'].setValue(this.detail.state ? '1' : '0');
    }
  }


  send(){
    this.isSending = true;
    //updating object
    this.detail.observations = this.detailForm.controls['observations'].value;
    this.detail.codition_id = this.detailForm.controls['codition_id'].value;
    this.detail.state = this.detailForm.controls['state'].value;
    this.detail.pet_id = this.petId;

    if(this.detail.id == undefined){
      //post
      this.petDetailsService.post(this.detail).subscribe(
        result => {
          this.openSnackBar("Ingresado con éxito", "Cerrar");
          this.dialogRef.close();
      },
      error=>{
        this.openSnackBar("Ocurrió un error al ingresar la condición médica", "Cerrar");
      }
      );
    }else{
      //put
      this.petDetailsService.put(this.detail).subscribe(
        result => {
          this.openSnackBar("Actualizado con éxito", "Cerrar");
          this.dialogRef.close();
          
      },
      error=>{
        this.openSnackBar("Ocurrio un error al actualizar la condición médica", "Cerrar");
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
