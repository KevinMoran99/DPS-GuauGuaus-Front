import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//Angular material
import {SidenavComponent } from './components/sidenav/sidenav.component';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
//components
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CitasComponent } from './components/citas/citas.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PermisosComponent } from './components/permisos/permisos.component';
import { EspeciesComponent } from './components/especies/especies.component';
import { AboutComponent } from './components/about/about.component';
import { EspeciesDialogComponent } from './components/especies/especies-dialog/especies-dialog.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { MascotasDialogComponent } from './components/mascotas/mascotas-dialog/mascotas-dialog.component';
import { TiposCitaComponent } from './components/tipos-cita/tipos-cita.component';
import { TiposCitaDialogComponent } from './components/tipos-cita/tipos-cita-dialog/tipos-cita-dialog.component';
import { CondicionMedicaComponent } from './components/condicion-medica/condicion-medica.component';
import { CondicionMedicaDialogComponent } from './components/condicion-medica/condicion-medica-dialog/condicion-medica-dialog.component';
import { UsuariosDialogComponent } from './components/usuarios/usuarios-dialog/usuarios-dialog.component';
import { UsuariosMenuComponent } from './components/usuarios/usuarios-menu/usuarios-menu.component';
import { UsuariosMascotasComponent } from './components/usuarios/usuarios-mascotas/usuarios-mascotas.component';
import { TipoUsuarioComponent } from './components/tipo-usuario/tipo-usuario.component';
import { TipoUsuarioDialogComponent } from './components/tipo-usuario/tipo-usuario-dialog/tipo-usuario-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service'
import { AuthGuard } from './guards/auth.guard';

//imagepicker config
const config: InputFileConfig = {
  fileAccept: 'image/*'
};

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
    CitasComponent,
    UsuariosComponent,
    PermisosComponent,
    EspeciesComponent,
    AboutComponent,
    EspeciesDialogComponent,
    MascotasComponent,
    MascotasDialogComponent,
    TiposCitaComponent,
    TiposCitaDialogComponent,
    CondicionMedicaComponent,
    CondicionMedicaDialogComponent,
    UsuariosDialogComponent,
    UsuariosMenuComponent,
    UsuariosMascotasComponent,
    TipoUsuarioComponent,
    TipoUsuarioDialogComponent,
    LoginComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    FormsModule,
    MatDividerModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatRadioModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
    InputFileModule.forRoot(config),
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
