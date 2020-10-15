import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
    private router:Router
    ) { }

  ngOnInit(): void {
    this.authService.logIn ? this.router.navigate(['']) : "";
  }

  login() {
  this.authService.login(this.email, this.password)
  }

}
