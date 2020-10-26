import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { CitasComponent } from './components/citas/citas.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EspeciesComponent } from './components/especies/especies.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CondicionMedicaComponent } from './components/condicion-medica/condicion-medica.component';
import { TiposCitaComponent } from './components/tipos-cita/tipos-cita.component';
import { TipoUsuarioComponent } from './components/tipo-usuario/tipo-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PermisosComponent } from './components/permisos/permisos.component';

const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent
  },  
  {
    path: '', 
    component: SidenavComponent, 
    canActivate: [AuthGuard], 
    children: [
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
      {path: 'mascotas', component: MascotasComponent, canActivate: [AuthGuard]},
      {path: 'citas', component: CitasComponent, canActivate: [AuthGuard]},
      {path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
      {path: 'permisos', component: PermisosComponent, canActivate: [AuthGuard]},
      {path: 'especies', component: EspeciesComponent, canActivate: [AuthGuard]},
      {path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
      {path: 'condicion-medica', component: CondicionMedicaComponent, canActivate: [AuthGuard]},
      {path: 'tipo-citas', component: TiposCitaComponent, canActivate: [AuthGuard]},
      {path: 'tipo-usuarios', component: TipoUsuarioComponent, canActivate: [AuthGuard]}
    ]
  },
  { path: '**', redirectTo: ''} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
