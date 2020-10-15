import { Injectable, NgZone } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Guardar datos de usuario registrados
  uri = 'http://104.197.18.35/DPS-GuauGuaus-Back/public';
  token;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
  private http: HttpClient,
  private router: Router,
  ) { }

  login(email: string, password: string) {
    this.http.post(this.uri + '/login', {email: email,password: password}).subscribe((resp: any) => {
      this.loggedIn.next(true);
      this.router.navigate(['']);
      localStorage.setItem('auth_token', resp.token);
      }) 
    }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
   
  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }
}
