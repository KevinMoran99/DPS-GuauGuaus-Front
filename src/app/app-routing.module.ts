import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { CitasComponent } from './components/citas/citas.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EspeciesComponent } from './components/especies/especies.component';
import { PermisosComponent } from './components/permisos/permisos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CondicionMedicaComponent } from './components/condicion-medica/condicion-medica.component';
import { TiposCitaComponent } from './components/tipos-cita/tipos-cita.component';
import { TipoUsuarioComponent } from './components/tipo-usuario/tipo-usuario.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'mascotas', component: MascotasComponent},
  {path: 'citas', component: CitasComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'permisos', component: PermisosComponent},
  {path: 'especies', component: EspeciesComponent},
  {path: 'about', component: AboutComponent},
  {path: 'condicion-medica', component: CondicionMedicaComponent},
  {path: 'tipo-citas', component: TiposCitaComponent},
  {path: 'tipo-usuarios', component: TipoUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
