import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { auth } from 'firebase';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsuariosDialogComponent } from '../usuarios/usuarios-dialog/usuarios-dialog.component';
import { ModalSettings } from '../../helpers/settings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router:Router,
    public authServiceFirebase: AuthService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.authService.logIn ? this.router.navigate(['']) : "";
  }

  login() {
  this.authService.login(this.email, this.password)
  }

  
  //opening the Add User Dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(UsuariosDialogComponent, ModalSettings.perfilUpdateSettings);
    dialogRef.componentInstance.title = ModalSettings.perfilUpdateSettings.title;
    dialogRef.componentInstance.isRegisterUser = true;
    dialogRef.afterClosed().subscribe(result => {
      dialogRef.componentInstance.isSending = false;
    });
  }

}
