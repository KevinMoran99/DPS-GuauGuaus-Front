import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalSettings } from '../../../helpers/settings';
import { User } from '../../../models/user.model';
import { UsersService } from '../../../services/users.service';
import { SchedulesService } from '../../../services/schedules.service';
import { Schedule } from 'src/app/models/schedule.module';
import { HoradocDialogComponent } from './horadoc-dialog/horadoc-dialog.component';

@Component({
  selector: 'app-horarios-doctores',
  templateUrl: './horarios-doctores.component.html',
  styleUrls: ['./horarios-doctores.component.css']
})
export class HorariosDoctoresComponent implements OnInit {

  //columns to display in the table
  columnsToDisplay = ['day', 'start_hour', 'finish_hour', 'state'];
  //current objects
  user: User;
  schedules: MatTableDataSource<Schedule>;
  
  //Usuario logeado
  loggedUser: User;
  //Variables que definen el acceso del usuario
  permCreate:Boolean = false;
  permUpdate:Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private schedulesService: SchedulesService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    //Auth
    this.user = JSON.parse(localStorage.getItem('auth'));
    if(this.user.permission.find(per => per.registro == "schedules").create) {
      this.permCreate = true;
    }
    if(this.user.permission.find(per => per.registro == "schedules").update) {
      this.permUpdate = true;
      this.columnsToDisplay.push('edit');
    }

    this.route.paramMap.subscribe(params => {
      let id = +params.get('userId');
      this.usersService.get(id).subscribe(
        result => {
          this.user = result as User;
          this.getAll();
        }, error=>{
          if(error.status == 404){
            alert("Error al obtener los datos del doctor en el servidor");
          }
        });
    });
    
  }

 //we try to get all the users from the API
 getAll(){
  this.schedulesService.getAllByUser(this.user.id).subscribe(
    result => {
      this.schedules = new MatTableDataSource<Schedule>(result as Schedule[]);
      this.schedules.paginator = this.paginator;
    }, error=>{
      if(error.status == 404){
        this.openSnackBar(this.user.name + ' aún no tiene horarios asignados.', 'Cerrar');
      }
      else {
        alert('Ocurrió un error inesperado.');
      }
    });
  }


  //opening the Add Detail Dialog
  openDialog(schedule?: Schedule): void {
    const dialogRef = this.dialog.open(HoradocDialogComponent, ModalSettings.ScheduleAddSettings);
    dialogRef.componentInstance.title = ModalSettings.ScheduleAddSettings.title;
    dialogRef.componentInstance.userId = this.user.id;
    if(schedule != undefined){
      dialogRef.componentInstance.schedule = schedule;
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
