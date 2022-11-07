import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { OngFormComponent } from './modules/ong/ong-form/ong-form.component';
import { OngDashboardComponent } from './modules/ong/ong-dashboard/ong-dashboard.component';
import { OngFixedCostsComponent } from './modules/ong/ong-fixed-costs/ong-fixed-costs.component';
import { OngDonationsComponent } from './modules/ong/ong-donations/ong-donations.component';
import { CampaignDashboardComponent } from './modules/campaign/campaign-dashboard/campaign-dashboard.component';
import { CampaignDonationsComponent } from './modules/campaign/campaign-donations/campaign-donations.component';
import { CampaignStatisticsComponent } from './modules/campaign/campaign-statistics/campaign-statistics.component';
import { CampaignFormComponent } from './modules/campaign/campaign-form/campaign-form.component';
import { CampaignFixedCostsComponent } from './modules/campaign/campaign-fixed-costs/campaign-fixed-costs.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  {
    path: 'ong',
    loadChildren: () => import('./modules/ong/ong.module').then(m => m.OngModule)
  },
  {
    path: 'ong-form',
    component: OngFormComponent
  },
  {
    path: 'campaign',
    loadChildren: () => import('./modules/campaign/campaign.module').then(m => m.CampaignModule)
  },
  {
    path: 'campaign-form',
    component: CampaignFormComponent
  },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'ong-dashboard',
    component: OngDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'costos-fijos', component: OngFixedCostsComponent, outlet: 'ong' },
      { path: 'solicitar-donaciones', component: OngDonationsComponent, outlet: 'ong' },
      { path: 'editar', component: OngFormComponent, outlet: 'ong' }
    ]
  },
  {
    path: 'campaign-dashboard',
    component: CampaignDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'estadisticas', component: CampaignStatisticsComponent, outlet: 'campaign' },
      { path: 'costos-fijos', component: CampaignFixedCostsComponent, outlet: 'campaign' },
      { path: 'solicitar-donaciones', component: CampaignDonationsComponent, outlet: 'campaign' },
      { path: 'editar', component: CampaignFormComponent, outlet: 'campaign' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
