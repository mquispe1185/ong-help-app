import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { OngFormComponent } from './ong/ong-form/ong-form.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  {
    path: 'ongs',
    loadChildren: () => import('./ong/ong.module').then(m => m.OngModule)
  },
  {
    path: 'new-ong',
    component: OngFormComponent,
  },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
