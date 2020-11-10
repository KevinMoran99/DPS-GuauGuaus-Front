import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Appointment } from '../../models/appointment.model';
import { User } from 'src/app/models/user.model';
//from here we get the data
import { AppointmentService } from '../../services/appointment.service';
import { CitasDialogComponent } from './citas-dialog/citas-dialog.component';
//here are stored all our modal settings
import { ModalSettings } from '../../helpers/settings';
import { Pet } from 'src/app/models/pet.model';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  @Input() pet;
  //columns to display in the table
  columnsToDisplay = ['pet', 'type', 'doctor', 'date', 'emergency', 'state'];
  //appointment objects
  appointment: Appointment;
  appointments: MatTableDataSource<Appointment>;
  
  //Usuario logeado
  user: User;
  //Variables que definen el acceso del usuario
  permCreate:Boolean = false;
  permUpdate:Boolean = false;

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(){
    //Auth
    this.user = JSON.parse(localStorage.getItem('auth'));
    try{
      if(this.user.permission.find(per => per.registro == "appointment").create) {
        this.permCreate = true;
      }
    } catch{}
    try{
      if(this.user.permission.find(per => per.registro == "appointment").update) {
        this.permUpdate = true;
        this.columnsToDisplay.push('edit');
      }
    } catch{}

    (this.pet as Pet) ?  this.getByPet((this.pet as Pet).id) : this.getAll();
    
  }

  //we try to get all the species from the API
  getAll(){
    this.appointmentService.getAll().subscribe(
      result => {
        this.appointments = new MatTableDataSource<Appointment>(result as Appointment[]);
        this.appointments.paginator = this.paginator;
      }, error=>{
        if(error.status == 404){
          alert("Error al obtener los datos del servidor");
        }
      });
  }
  getByPet(id){
    this.appointmentService.byPet(id).subscribe(
      result => {
        console.log(result);
        this.appointments = new MatTableDataSource<Appointment>(result as Appointment[]);
        this.appointments.paginator = this.paginator;
      }, error=>{
        if(error.status == 404){
          //alert("Error al obtener los datos del servidor");
        }
      });
  }

  //opening the Add Appointment Dialog
  openDialog(appointment?: Appointment): void {
    const dialogRef = this.dialog.open(CitasDialogComponent, ModalSettings.citasAddSettings);
    dialogRef.componentInstance.title = ModalSettings.citasAddSettings.title;
    if(appointment != undefined){
      dialogRef.componentInstance.appointment = appointment;
    }
    dialogRef.afterClosed().subscribe(result => {
      dialogRef.componentInstance.isSending = false;
      this.getAll();
    });
  }

}
