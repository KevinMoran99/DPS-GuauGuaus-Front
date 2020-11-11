import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//imports to post/put
import { Appointment } from '../../../models/appointment.model';
import { AppointmentService } from '../../../services/appointment.service';
import { Pet } from 'src/app/models/pet.model';
import { PetsService } from 'src/app/services/pets.service';
import { AppointmentTypes } from 'src/app/models/appointment-types.model';
import { AppointmentTypesService } from 'src/app/services/appointment-types.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { SchedulesService } from 'src/app/services/schedules.service'
import { Schedule } from 'src/app/models/schedule.module';

@Component({
  selector: 'app-citas-dialog',
  templateUrl: './citas-dialog.component.html',
  styleUrls: ['./citas-dialog.component.css'],
  providers:[DatePipe]
})
export class CitasDialogComponent implements OnInit {

  //properties to be accesed by the dialog
  public title:string;
  appointment = new Appointment();
  isSending: boolean = false;

  pets: Pet[];
  types: AppointmentTypes[];
  doctors: User[];
  schedules: Schedule[];

  minDate: Date = new Date();

  //columns to display in the table
  columnsToDisplay = ['day', 'start_hour', 'finish_hour'];

  //validating form
  appointmentForm: FormGroup = this.formBuilder.group({
    appointment_date: [, {validators: [Validators.required]}],
    appointment_start_hour: [, {validators: [Validators.required]}],
    status: [, {validators: [Validators.required]}],
    observations: [, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(1000)], updateOn: "change" }],
    emergency: ["0", {validators: [Validators.required]}],
    type_id: [, {validators: [Validators.required]}],
    pet_id: [, {validators: [Validators.required]}],
    doctor_id: [, {validators: [Validators.required]}],
    state: ["1", {validators: [Validators.required]}],
  });

  constructor(
    public dialogRef: MatDialogRef<CitasDialogComponent>, 
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private petsService: PetsService,
    private typesService: AppointmentTypesService,
    private usersService: UsersService,
    private schedulesService: SchedulesService,
    private _snackBar: MatSnackBar,
    public datePipe: DatePipe) { }

  ngOnInit(): void {
    //populating selects
    this.petsService.getActive().subscribe(
      result => {
        this.pets = result as Pet[];
      }, error=>{
        if(error.status == 404){
          alert("Error al obtener los datos de mascotas del servidor");
      }
    });
    this.typesService.getActive().subscribe(
      result => {
        this.types = result as AppointmentTypes[];
      }, error=>{
        if(error.status == 404){
          alert("Error al obtener los datos de tipos de citas del servidor");
      }
    });
    this.usersService.getActive().subscribe(
      result => {
        let users = result as User[];
        this.doctors = users.filter(x => x.type_user_id == 1);
      }, error=>{
        if(error.status == 404){
          alert("Error al obtener los datos de doctores del servidor");
      }
    });


    //if comes from edit
    if(this.appointment.id != undefined){
      this.appointmentForm.controls['appointment_date'].setValue(this.appointment.appointment_date);
      this.appointmentForm.controls['appointment_start_hour'].setValue(this.appointment.appointment_start_hour);
      this.appointmentForm.controls['status'].setValue(this.appointment.status);
      this.appointmentForm.controls['observations'].setValue(this.appointment.observations);
      this.appointmentForm.controls['emergency'].setValue(this.appointment.emergency ? '1' : '0');
      this.appointmentForm.controls['type_id'].setValue(this.appointment.type_id);
      this.appointmentForm.controls['pet_id'].setValue(this.appointment.pet_id);
      this.appointmentForm.controls['doctor_id'].setValue(this.appointment.doctor_id);
      this.appointmentForm.controls['state'].setValue(this.appointment.state ? '1' : '0');
      this.getSchedules();
    }
  }
  
  onNoClick(): void {
    //this.dialogRef.close();
  }
  //TO-DO: Handle POST 
  send(){
    this.isSending = true;
    //updating object
    this.appointment.appointment_start_hour = this.appointmentForm.controls['appointment_start_hour'].value;
    this.appointment.status = this.appointmentForm.controls['status'].value;
    this.appointment.observations = this.appointmentForm.controls['observations'].value;
    this.appointment.emergency = this.appointmentForm.controls['emergency'].value;
    this.appointment.type_id = this.appointmentForm.controls['type_id'].value;
    this.appointment.pet_id = this.appointmentForm.controls['pet_id'].value;
    this.appointment.doctor_id = this.appointmentForm.controls['doctor_id'].value;
    this.appointment.state = this.appointmentForm.controls['state'].value;

    try {
      this.appointment.appointment_date = (this.appointmentForm.controls['appointment_date'].value).toISOString().slice(0,10);
    }
    catch {
      this.appointment.appointment_date = this.appointmentForm.controls['appointment_date'].value;
    }

    if(this.appointment.id == undefined){
      //post
      this.appointmentService.post(this.appointment).subscribe(
        result => {
          this.openSnackBar("Ingresado con éxito", "Cerrar");
          this.dialogRef.close();
      },
      error=>{
        let ex = error.error.errors.appointment_start_hour[0];
        if (ex != null) {
          this.openSnackBar(ex, "Cerrar");
          this.isSending = false;
        }
        else {
          this.openSnackBar("Ocurrió un error al ingresar la cita", "Cerrar");
        }
      }
      );
    }else{
      //put
      this.appointmentService.put(this.appointment).subscribe(
        result => {
          this.openSnackBar("Actualizado con éxito", "Cerrar");
          this.dialogRef.close();
          
      },
      error=>{
        let ex = error.error.errors.appointment_start_hour[0];
        if (ex != null) {
          this.openSnackBar(ex, "Cerrar");
          this.isSending = false;
        }
        else {
          this.openSnackBar("Ocurrió un error al actualizar la cita", "Cerrar");
        }
      }
      );
    }
  }

  getSchedules(){
    this.schedulesService.getActiveByUser(this.appointmentForm.controls['doctor_id'].value).subscribe(
      result => {
        this.schedules = result as Schedule[];
      }, error=>{
        if(error.status == 404){
          this.openSnackBar('El doctor seleccionado no tiene horarios asignados.', 'Cerrar');
        }
        else {
          alert('Ocurrió un error inesperado.');
        }
      });
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
