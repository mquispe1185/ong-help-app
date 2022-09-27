import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignFormComponent } from './modules/campaign/campaign-form/campaign-form.component';
import { InicioComponent } from './inicio/inicio.component';
import { OngFormComponent } from './modules/ong/ong-form/ong-form.component';
import { OngDashboardComponent } from './modules/ong/ong-dashboard/ong-dashboard.component';

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
  {
    path: 'dashboard',
    component: OngDashboardComponent
  },
  { path: 'campaign', loadChildren: () => import('./modules/campaign/campaign.module').then(m => m.CampaignModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
