import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//imports to post/put
import { Pet } from 'src/app/models/pet.model';
import { PetsService } from 'src/app/services/pets.service';
import { Specie } from 'src/app/models/specie.model';
import { SpeciesService } from 'src/app/services/species.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

import { InputFile } from 'ngx-input-file';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mascotas-dialog',
  templateUrl: './mascotas-dialog.component.html',
  styleUrls: ['./mascotas-dialog.component.css']
})
export class MascotasDialogComponent implements OnInit {

  //properties to be accesed by the dialog
  public title:string;
  public client:boolean;
  pet = new Pet();
  isSending: boolean = false;
  user:User;

  //Validating form
  petForm: FormGroup = this.formBuilder.group({
    name: [, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(25)], updateOn: "change" }],
    birthday: [, {validators: [Validators.required]}],
    photo: [, {validators: [Validators.required]}],
    weight: [, {validators: [Validators.required, Validators.min(0)]}],
    height: [, {validators: [Validators.required, Validators.min(0)]}],
    state: ["1", {validators: [Validators.required]}],
    species_id: [, {validators: [Validators.required]}],
    owner_id: [, {validators: [Validators.required]}],
  });


  maxDate: Date = new Date();

  species: Specie[];
  users: User[];

  constructor(
    public dialogRef: MatDialogRef<MascotasDialogComponent>, 
    private formBuilder: FormBuilder,
    private petsService: PetsService,
    private speciesService: SpeciesService,
    private usersService: UsersService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('auth'));
    this.petForm.controls['owner_id'].setValue(this.user.id);
    this.client? this.petForm.controls['owner_id'].disable() : this.petForm.controls['owner_id'].enable();
    //populating selects
    this.speciesService.getActive().subscribe(
      result => {
        this.species = result as Specie[];
      }, error=>{
        if(error.status == 404){
          alert("Error al obtener los datos de especies del servidor");
      }
    });
    if(!this.client){
      this.usersService.getActive().subscribe(
        result => {
          this.users = result as User[];
        }, error=>{
          if(error.status == 404){
            alert("Error al obtener los datos de usuarios del servidor");
        }
      });
    }
    //if comes from edit
    if(this.pet.id != undefined){
      this.petForm.controls['name'].setValue(this.pet.name);
      this.petForm.controls['birthday'].setValue(this.pet.birthday);
      this.petForm.controls['weight'].setValue(this.pet.weight);
      this.petForm.controls['height'].setValue(this.pet.height);
      this.petForm.controls['state'].setValue(this.pet.state ? '1' : '0');
      this.petForm.controls['species_id'].setValue(this.pet.species_id);
      this.petForm.controls['owner_id'].setValue(this.pet.owner_id);
 
      //Retrieving photo
      let url = environment.baseUrl.substring(0, environment.baseUrl.length) + this.pet.photo;
      let urlSplit = url.split("/");
      let imageName = urlSplit[urlSplit.length - 1];

      console.log(url);

      let retrievedPhoto: InputFile[] = [];
      retrievedPhoto.push({
        preview: url,
        file: new File([url], imageName)
      });

      this.petForm.controls['photo'].setValue(retrievedPhoto);

      this.cdr.detectChanges();
      
    }
  }


  send(){
    this.isSending = true;
    //updating object
    this.pet.name = this.petForm.controls['name'].value;
    try {
      this.pet.birthday = (this.petForm.controls['birthday'].value).toISOString().slice(0,10);
    }
    catch {
      this.pet.birthday = this.petForm.controls['birthday'].value;
    }
    let photoPrev = this.petForm.controls['photo'].value[0].preview.split(",");
    this.pet.photo = photoPrev[1];
    this.pet.weight = (this.petForm.controls['weight'].value).toFixed(2);
    this.pet.height = (this.petForm.controls['height'].value).toFixed(2);
    this.pet.state = this.petForm.controls['state'].value;
    this.pet.species_id = this.petForm.controls['species_id'].value;
    this.pet.owner_id = this.petForm.controls['owner_id'].value;


    if(this.pet.id == undefined){
      //post
      this.petsService.post(this.pet).subscribe(
        result => {
          this.openSnackBar("Ingresado con éxito", "Cerrar");
          this.dialogRef.close();
      },
      error=>{
        this.openSnackBar("Ocurrió un error al ingresar la mascota", "Cerrar");
      }
      );
    }else{
      //put
      this.petsService.put(this.pet).subscribe(
        result => {
          this.openSnackBar("Actualizado con éxito", "Cerrar");
          this.dialogRef.close();
          
      },
      error=>{
        this.openSnackBar("Ocurrio un error al actualizar la mascota", "Cerrar");
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
