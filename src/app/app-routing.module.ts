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
import { OngEditComponent } from './modules/ong/ong-edit/ong-edit.component';
import { CampaignFixedCostsComponent } from './modules/campaign/campaign-fixed-costs/campaign-fixed-costs.component';
import { AuthGuard } from './guards/auth.guard';
import { OngDonationListComponent } from './modules/ong/ong-donation-list/ong-donation-list.component';
import { CampaignDonationListComponent } from './modules/campaign/campaign-donation-list/campaign-donation-list.component';
import { CampaignEditComponent } from './modules/campaign/campaign-edit/campaign-edit.component';

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
      { path: 'ver-donaciones', component: OngDonationListComponent, outlet: 'ong' },
      { path: 'editar', component: OngEditComponent, outlet: 'ong' }
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
      { path: 'ver-donaciones', component: CampaignDonationListComponent, outlet: 'campaign' },
      { path: 'editar', component: CampaignEditComponent, outlet: 'campaign' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
