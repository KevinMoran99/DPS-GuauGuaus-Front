import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalSettings } from 'src/app/helpers/settings';
import { AppointmentTypes } from 'src/app/models/appointment-types.model';
import { User } from 'src/app/models/user.model';
import { AppointmentTypesService } from 'src/app/services/appointment-types.service';
import { TiposCitaDialogComponent } from './tipos-cita-dialog/tipos-cita-dialog.component';

@Component({
  selector: 'app-tipos-cita',
  templateUrl: './tipos-cita.component.html',
  styleUrls: ['./tipos-cita.component.css']
})
export class TiposCitaComponent implements OnInit {

  //columns to display in the table
  columnsToDisplay = ['name','duration', 'state'];
  //specie objects
  appointmentType: AppointmentTypes;
  appointmentTypes: MatTableDataSource<AppointmentTypes>;
  
  //Usuario logeado
  user: User;
  //Variables que definen el acceso del usuario
  permCreate:Boolean = false;
  permUpdate:Boolean = false;

  constructor(
    private appointmentTypeService: AppointmentTypesService,
    private dialog: MatDialog,) { }
    
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(){
    //Auth
    this.user = JSON.parse(localStorage.getItem('auth'));
    if(this.user.permission.find(per => per.registro == "appointment_types").create) {
      this.permCreate = true;
    }
    if(this.user.permission.find(per => per.registro == "appointment_types").update) {
      this.permUpdate = true;
      this.columnsToDisplay.push('edit');
    }
    this.getAll();
  }

  //we try to get all the species from the API
  getAll(){
    this.appointmentTypeService.getAll().subscribe(
      result => {
        this.appointmentTypes = new MatTableDataSource<AppointmentTypes>(result as AppointmentTypes[]);
        this.appointmentTypes.paginator = this.paginator;
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
