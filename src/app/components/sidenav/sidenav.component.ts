import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user.model';
import { Userl } from 'src/app/models/userl';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent  {
  user:User;
  //userl:Userl;
  isLoggedIn$: Observable<boolean>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe( 
      map(result => result.matches),
      shareReplay()
    );
  
  //Variables que definen el acceso del usuario
  permMyPets:Boolean  = false;
  permPets:Boolean    = false;
  permApp:Boolean     = false;
  permUser:Boolean    = false;
  permUsType:Boolean  = false;
  permPerm:Boolean    = false;
  permSpec:Boolean    = false;
  permCond:Boolean    = false;
  permAppType:Boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.user = JSON.parse(localStorage.getItem('auth'));
    //this.userl = JSON.parse(localStorage.getItem('auth'));
    console.table(this.user);

    //Verificando los permisos del usuario
    if(this.user.type_user_id == 3 || this.user.uid != null) {
      this.permMyPets = true;
    }
    try{
      if(this.user.permission.find(per => per.registro == "pets").read) {
        this.permPets = true;
      }
    } catch{}
    try{
      if(this.user.permission.find(per => per.registro == "appointment").read) {
        this.permApp = true;
      }
    } catch{}
    try{
      if(this.user.permission.find(per => per.registro == "users").read) {
        this.permUser = true;
      }
    } catch{}
    try{
      if(this.user.permission.find(per => per.registro == "users_types").read) {
        this.permUsType = true;
      }
    } catch{}
    try{
      if(this.user.permission.find(per => per.registro == "permissions").read) {
        this.permPerm = true;
      }
    } catch{}
    try{
      if(this.user.permission.find(per => per.registro == "species").read) {
        this.permSpec = true;
      }
    } catch{}
    try{
      if(this.user.permission.find(per => per.registro == "medical_condition").read) {
        this.permCond = true;
      }
    } catch{}
    try{
      if(this.user.permission.find(per => per.registro == "appointment_types").read) {
        this.permAppType = true;
      }
    } catch{}
  }

  onLogout() {
    this.authService.logout();
  }

}
