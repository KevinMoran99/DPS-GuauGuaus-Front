import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Appointment } from '../../models/appointment.model';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';
//from here we get the data
import { AppointmentService } from '../../services/appointment.service';
import { CitasDialogComponent } from './citas-dialog/citas-dialog.component';
//here are stored all our modal settings
import { ModalSettings } from '../../helpers/settings';
import { Pet } from 'src/app/models/pet.model';

import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';
import { Observable } from 'rxjs';
import { colors } from '../../helpers/demo-utils/colors';


function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';
    console.log(`T00:00:00${direction}${hoursOffset}:${minutesOffset}`)
  return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
}


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
  providers:[DatePipe]
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

  //id de doctor, si es la vista de citas por doctor
  doctorId: number;


  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events$: Observable<CalendarEvent<{ appointment: Appointment }>[]>;
  activeDayIsOpen: boolean = false;
  locale: string = 'es';


  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
    public datePipe: DatePipe,
    private route: ActivatedRoute,) { }

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

    this.route.paramMap.subscribe(params => {
      this.doctorId = +params.get('doctorId');
    });


    this.updateData();
    
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
      
      this.updateCalendar(this.appointmentService.getActive());
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

      this.updateCalendar(this.appointmentService.byPet(id));
  }
  
  getByDoctor(id){
    this.appointmentService.byDoctor(id).subscribe(
      result => {
        console.log(result);
        this.appointments = new MatTableDataSource<Appointment>(result as Appointment[]);
        this.appointments.paginator = this.paginator;
        console.log(this.appointments);
      }, error=>{
        if(error.status == 404){
          //alert("Error al obtener los datos del servidor");
        }
      });

      this.updateCalendar(this.appointmentService.byDoctor(id));
  }

  updateData() {
    if (this.pet as Pet) {
      this.getByPet((this.pet as Pet).id)
    }  
    else {
      if (this.doctorId != undefined && this.doctorId != 0) {
        this.getByDoctor(this.doctorId);
      }
      else {
        this.getAll();
      }
    }
  }

  updateCalendar(func: Observable<Object>) {
    this.events$ = 
      func.pipe(
        map((result: Appointment[]) => {
          //color helper array
          let doctorIds: Number[] = [];
          return result.map((appointment: Appointment) => {

            if (!doctorIds.find(x => x == appointment.doctor_id)) {
              doctorIds.push(appointment.doctor_id);
            }

            return {
              title: appointment.doctor.name + " " + appointment.doctor.lastname + ": " + 
                    appointment.type.name + " de " + appointment.pet.name +  " (" + 
                    appointment.pet.owner.name + " " + appointment.pet.owner.lastname + ")" + 
                    "  -  " + appointment.appointment_start_hour,
              start: new Date(
                appointment.appointment_date + "T" + appointment.appointment_start_hour
              ),
              allDay: false,
              color: colors[doctorIds.findIndex(x => x == appointment.doctor_id)],
              meta: {
                appointment,
              },
            };
          });
        })
      );
  }

  dayClicked({
    date,
    events,
  }: {
    date: Date;
    events: CalendarEvent<{ appointment: Appointment }>[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<{ appointment: Appointment }>): void {
    this.openDialog(event.meta.appointment);
  }

  //opening the Add Appointment Dialog
  openDialog(appointment?: Appointment): void {
    const dialogRef = this.dialog.open(CitasDialogComponent, this.permUpdate ? ModalSettings.citasAddSettings : ModalSettings.citasSeeSettings);
    if (this.permUpdate) {
      dialogRef.componentInstance.title = ModalSettings.citasAddSettings.title;
    }
    else {
      dialogRef.componentInstance.title = ModalSettings.citasSeeSettings.title;
      dialogRef.componentInstance.readOnly = true;
    }
    if(appointment != undefined){
      dialogRef.componentInstance.appointment = appointment;
    }
    dialogRef.afterClosed().subscribe(result => {
      dialogRef.componentInstance.isSending = false;
      this.updateData();
    });
  }


}
