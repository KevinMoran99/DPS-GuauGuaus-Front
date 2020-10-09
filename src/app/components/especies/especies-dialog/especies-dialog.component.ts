import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//imports to post/put
import { Specie } from 'src/app/models/specie.model';
import { SpeciesService } from 'src/app/services/species.service';

@Component({
  selector: 'app-especies-dialog',
  templateUrl: './especies-dialog.component.html',
  styleUrls: ['./especies-dialog.component.css']
})
export class EspeciesDialogComponent implements OnInit {

  //properties to be accesed by the dialog
  public title:string;
  specie = new Specie();
  isSending: boolean = false;

  //validating form
  specieForm: FormGroup = this.formBuilder.group({
    name: [, { validators: [Validators.required, Validators.minLength(3)], updateOn: "change" }],
    state: ["1", {validators: [Validators.required]}],
  });

  constructor(
    public dialogRef: MatDialogRef<EspeciesDialogComponent>, 
    private formBuilder: FormBuilder,
    private speciesService: SpeciesService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //if comes from edit
    if(this.specie.id != undefined){
      this.specieForm.controls['name'].setValue(this.specie.name);
      this.specieForm.controls['state'].setValue(this.specie.state ? '1' : '0');
    }
  }
  
  onNoClick(): void {
    //this.dialogRef.close();
  }
  //TO-DO: Handle POST 
  send(){
    this.isSending = true;
    //updating object
    this.specie.name = this.specieForm.controls['name'].value;
    this.specie.state = this.specieForm.controls['state'].value;

    if(this.specie.id == undefined){
      //post
      this.speciesService.post(this.specie).subscribe(
        result => {
          this.openSnackBar("Ingresado con éxito", "Cerrar");
          this.dialogRef.close();
      },
      error=>{
        this.openSnackBar("Ocurrió un error al ingresar la especie", "Cerrar");
      }
      );
    }else{
      //put
      this.speciesService.put(this.specie).subscribe(
        result => {
          this.openSnackBar("Actualizado con éxito", "Cerrar");
          this.dialogRef.close();
          
      },
      error=>{
        this.openSnackBar("Ocurrio un error al actualizar la especie", "Cerrar");
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
