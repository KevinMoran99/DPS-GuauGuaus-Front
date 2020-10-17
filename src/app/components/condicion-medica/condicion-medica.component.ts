import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalSettings } from 'src/app/helpers/settings';
import { MedicalCondition } from 'src/app/models/medical-condition.model';
import { MedicalConditionsService } from 'src/app/services/medical-conditions.service';
import { CondicionMedicaDialogComponent } from './condicion-medica-dialog/condicion-medica-dialog.component';

@Component({
  selector: 'app-condicion-medica',
  templateUrl: './condicion-medica.component.html',
  styleUrls: ['./condicion-medica.component.css']
})
export class CondicionMedicaComponent implements OnInit {

    //columns to display in the table
    columnsToDisplay = ['name', 'state', 'edit'];
    //specie objects
    medicalCondition: MedicalCondition;
    medicalConditions: MatTableDataSource<MedicalCondition>;
  
    constructor(
      private medicalConditionService: MedicalConditionsService,
      private dialog: MatDialog,) { }
      
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
    ngOnInit(){
      this.getAll();
    }
  
    //we try to get all the species from the API
    getAll(){
      this.medicalConditionService.getAll().subscribe(
        result => {
          this.medicalConditions = new MatTableDataSource<MedicalCondition>(result as MedicalCondition[]);
          this.medicalConditions.paginator = this.paginator;
        }, error=>{
          if(error.status == 404){
            alert("Error al obtener los datos del servidor");
          }
        });
    }
  
    //opening the Add Specie Dialog
    openDialog(medicalCondition?: MedicalCondition): void {
      const dialogRef = this.dialog.open(CondicionMedicaDialogComponent, ModalSettings.condicionMedicaAddSettings);
      dialogRef.componentInstance.title = ModalSettings.condicionMedicaAddSettings.title;
      if(medicalCondition != undefined){
        dialogRef.componentInstance.medicalCondition = medicalCondition;
      }
      dialogRef.afterClosed().subscribe(result => {
        dialogRef.componentInstance.isSending = false;
        this.getAll();
      });
    }
}
