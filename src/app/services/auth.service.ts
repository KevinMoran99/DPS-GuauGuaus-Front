import { Injectable, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from "../models/user.model";
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Guardar datos de usuario registrados
  uri = environment.baseUrl;
  token;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.logIn);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
  private http: HttpClient,
  private router: Router,
  private location: Location,
  public afs: AngularFirestore,   //  Inyectar Servicio Firestore
  public afAuth: AngularFireAuth, // Inyectar el servicio de autenticación de Firebase
  public ngZone: NgZone // Servicio NgZone para eliminar la advertencia de alcance externo
  ) { 
    /* Guardar datos de usuario en almacenamiento local cuando
    iniciado sesión y configurando nulo al cerrar sesión*/
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  login(email: string, password: string) {
    this.http.post(this.uri + '/login', {email: email,password: password}).subscribe(
      (resp: any) => {
      this.loggedIn.next(true);
      this.location.replaceState('/');
      this.router.navigate(['']);
      localStorage.setItem('auth', JSON.stringify(resp));
      },
      error => { 
        window.alert("Credenciales Incorrectas."); 
      }
      ) 
    }

  logout() {
    localStorage.removeItem('auth');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
   
  public get logIn(): boolean {
    return (localStorage.getItem('auth') != null);
  }

//FIREBASE
// Iniciar sesión usando Facebook Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  // Lógica de autenticación para ejecutar cualquier proveedor de autenticación  
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider).then((result) => {
       //this.ngZone.run(() => {
        console.log(result.user.email+" "+result.user.displayName);
        this.http.post(this.uri + '/socials', {email: result.user.email, name: result.user.displayName}).subscribe((resp: any) => {
        this.loggedIn.next(true);
        this.location.replaceState('/');
        this.router.navigate(['']);
        localStorage.setItem('auth', JSON.stringify(resp));
        }) 
        //})
      //this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Configurar datos de usuario al iniciar sesión con nombre de usuario / contraseña,
  registrarse con nombre de usuario / contraseña e iniciar sesión con autenticación social
  proveedor en la base de datos de Firestore usando el servicio AngularFirestore + AngularFirestoreDocument*/
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.id}`);
    const userData: User = {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      dui: user.dui,
      address: user.address,
      phone: user.phone,
      state: user.state,
      type_user_id: user.type_user_id,
      created_at: user.created_at,
      updated_at: user.updated_at,
      token: user.token
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // desconectar
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.setItem('user', null);
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    })
  }
}
