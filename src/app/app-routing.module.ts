import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignFormComponent } from './modules/campaign/campaign-form/campaign-form.component';
import { InicioComponent } from './inicio/inicio.component';
import { OngFormComponent } from './modules/ong/ong-form/ong-form.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  {
    path: 'ongs',
    loadChildren: () => import('./modules/ong/ong.module').then(m => m.OngModule)
  },
  {
    path: 'new-ong',
    component: OngFormComponent,
  },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'new-campaign',
    component: CampaignFormComponent
  },
  { path: 'campaign', loadChildren: () => import('./modules/campaign/campaign.module').then(m => m.CampaignModule) },
  { path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
