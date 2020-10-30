import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//imports to post/put
import { Schedule } from 'src/app/models/schedule.module';
import { SchedulesService } from 'src/app/services/schedules.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-horadoc-dialog',
  templateUrl: './horadoc-dialog.component.html',
  styleUrls: ['./horadoc-dialog.component.css']
})
export class HoradocDialogComponent implements OnInit {

  //properties to be accesed by the dialog
  public title:string;
  schedule = new Schedule();
  userId: number;
  isSending: boolean = false;

  //Validating form
  scheduleForm: FormGroup = this.formBuilder.group({
    doctor_id: [, {validators: [Validators.required]}],
    day: [, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(1000)], updateOn: "change" }],
    start_hour: [, {validators: [Validators.required]}],
    finish_hour: [, {validators: [Validators.required]}],
    state: ["1", {validators: [Validators.required]}],
  });

  user: User[];

  constructor(
    public dialogRef: MatDialogRef<HoradocDialogComponent>, 
    private formBuilder: FormBuilder,
    private schedulesService: SchedulesService,
    private usersService: UsersService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    //populating selects
    this.usersService.getActive().subscribe(
      result => {
        this.user = result as User[];
      }, error=>{
        if(error.status == 404){
          alert("Error al obtener los datos de los doctores");
      }
    });

    //if comes from edit
    if(this.schedule.id != undefined){
      this.scheduleForm.controls['doctor_id'].setValue(this.schedule.doctor_id);
      this.scheduleForm.controls['day'].setValue(this.schedule.day);
      this.scheduleForm.controls['start_hour'].setValue(this.schedule.start_hour);
      this.scheduleForm.controls['finish_hour'].setValue(this.schedule.finish_hour);
      this.scheduleForm.controls['state'].setValue(this.schedule.state ? '1' : '0');
    }
  }


  send(){
    this.isSending = true;
    //updating object
    this.schedule.doctor_id = this.scheduleForm.controls['doctor_id'].value;
    //this.schedule.doctor_id = this.userId;
    this.schedule.day = this.scheduleForm.controls['day'].value;
    this.schedule.start_hour = this.scheduleForm.controls['start_hour'].value;
    this.schedule.finish_hour = this.scheduleForm.controls['finish_hour'].value;
    this.schedule.state = this.scheduleForm.controls['state'].value;
    

    if(this.schedule.id == undefined){
      //post
      this.schedulesService.post(this.schedule).subscribe(
        result => {
          this.openSnackBar("Ingresado con éxito", "Cerrar");
          this.dialogRef.close();
      },
      error=>{
        this.openSnackBar("Ocurrió un error al ingresar el horario", "Cerrar");
        console.log(this.schedule);
      }
      );
    }else{
      //put
      this.schedulesService.put(this.schedule).subscribe(
        result => {
          this.openSnackBar("Actualizado con éxito", "Cerrar");
          this.dialogRef.close();
          
      },
      error=>{
        this.openSnackBar("Ocurrio un error al actualizar el horario", "Cerrar");
        console.log(this.schedule);
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
