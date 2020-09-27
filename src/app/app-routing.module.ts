import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CitasComponent } from './components/citas/citas.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EspeciesComponent } from './components/especies/especies.component';
import { PermisosComponent } from './components/permisos/permisos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'citas', component: CitasComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'permisos', component: PermisosComponent},
  {path: 'especies', component: EspeciesComponent},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
