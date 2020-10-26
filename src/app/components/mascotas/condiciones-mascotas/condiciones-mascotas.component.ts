import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pet } from '../../../models/pet.model';
import { PetsService } from '../../../services/pets.service';
import { PetDetailsService } from '../../../services/pet-details.service';
import { PetDetail } from 'src/app/models/pet-detail.model';
import { CondmasDialogComponent } from './condmas-dialog/condmas-dialog.component';
//here are stored all our modal settings
import { ModalSettings } from '../../../helpers/settings';

@Component({
  selector: 'app-condiciones-mascotas',
  templateUrl: './condiciones-mascotas.component.html',
  styleUrls: ['./condiciones-mascotas.component.css']
})
export class CondicionesMascotasComponent implements OnInit {

  //columns to display in the table
  columnsToDisplay = ['name', 'observations', 'state', 'edit'];
  //current objects
  pet: Pet;
  details: MatTableDataSource<PetDetail>;

  constructor(
    private route: ActivatedRoute,
    private petsService: PetsService,
    private petDetailsService: PetDetailsService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = +params.get('petId');
      this.petsService.get(id).subscribe(
        result => {
          this.pet = result as Pet;
          this.getAll();
        }, error=>{
          if(error.status == 404){
            alert("Error al obtener los datos de la mascota del servidor");
          }
        });
    });
    
  }

  //we try to get all the pets from the API
  getAll(){
    this.petDetailsService.getAllByPet(this.pet.id).subscribe(
      result => {
        this.details = new MatTableDataSource<PetDetail>(result as PetDetail[]);
        this.details.paginator = this.paginator;
      }, error=>{
        if(error.status == 404){
          this.openSnackBar(this.pet.name + ' aún no tiene condiciones médicas asignadas.', 'Cerrar');
        }
        else {
          alert('Ocurrió un error inesperado.');
        }
      });
  }

  //opening the Add Detail Dialog
  openDialog(detail?: PetDetail): void {
    const dialogRef = this.dialog.open(CondmasDialogComponent, ModalSettings.condicionMedicaAddSettings);
    dialogRef.componentInstance.title = ModalSettings.condicionMedicaAddSettings.title;
    dialogRef.componentInstance.petId = this.pet.id;
    if(detail != undefined){
      dialogRef.componentInstance.detail = detail;
    }
    dialogRef.afterClosed().subscribe(result => {
      dialogRef.componentInstance.isSending = false;
      this.getAll();
    });
  }

  //send a toast
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
