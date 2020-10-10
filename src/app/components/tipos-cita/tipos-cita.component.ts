import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalSettings } from 'src/app/helpers/settings';
import { AppointmentTypes } from 'src/app/models/appointment-types.model';
import { AppointmentTypesService } from 'src/app/services/appointment-types.service';
import { TiposCitaDialogComponent } from './tipos-cita-dialog/tipos-cita-dialog.component';

@Component({
  selector: 'app-tipos-cita',
  templateUrl: './tipos-cita.component.html',
  styleUrls: ['./tipos-cita.component.css']
})
export class TiposCitaComponent implements OnInit {

  //columns to display in the table
  columnsToDisplay = ['name','duration', 'state', 'edit'];
  //specie objects
  appointmentType: AppointmentTypes;
  appointmentTypes: AppointmentTypes[];

  constructor(
    private appointmentTypeService: AppointmentTypesService,
    private dialog: MatDialog,) { }

  ngOnInit(){
    this.getAll();
  }

  //we try to get all the species from the API
  getAll(){
    this.appointmentTypeService.getAll().subscribe(
      result => {
        this.appointmentTypes = result as AppointmentTypes[];
      }, error=>{
        if(error.status == 404){
          alert("Error al obtener los datos del servidor");
        }
      });
  }

  //opening the Add Specie Dialog
  openDialog(appointmentType?: AppointmentTypes): void {
    const dialogRef = this.dialog.open(TiposCitaDialogComponent, ModalSettings.tipoCitaAddSettings);
    dialogRef.componentInstance.title = ModalSettings.tipoCitaAddSettings.title;
    if(appointmentType != undefined){
      dialogRef.componentInstance.appointmentType = appointmentType;
    }
    dialogRef.afterClosed().subscribe(result => {
      dialogRef.componentInstance.isSending = false;
      this.getAll();
    });
  }

}
