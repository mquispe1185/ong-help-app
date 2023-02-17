import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CampaignDashboardComponent } from './modules/campaign/campaign-dashboard/campaign-dashboard.component';
import { CampaignDonationsComponent } from './modules/campaign/campaign-donations/campaign-donations.component';
import { CampaignStatisticsComponent } from './modules/campaign/campaign-statistics/campaign-statistics.component';
import { CampaignFormComponent } from './modules/campaign/campaign-form/campaign-form.component';
import { CampaignFixedCostsComponent } from './modules/campaign/campaign-fixed-costs/campaign-fixed-costs.component';
import { AuthGuard } from './guards/auth.guard';
import { CampaignDonationListComponent } from './modules/campaign/campaign-donation-list/campaign-donation-list.component';
import { CampaignEditComponent } from './modules/campaign/campaign-edit/campaign-edit.component';
import { CampaignInfoComponent } from './modules/campaign/campaign-info/campaign-info.component';
import { EntityLinksComponent } from './modules/shared/entity-links/entity-links.component';
import { MyDonationsComponent } from './modules/donor/my-donations/my-donations.component';
import { OngComponent } from './modules/ong/ong.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  {
    path: 'ong',
    component: OngComponent
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
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/ong/ong.module').then(m => m.OngModule)
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
      { path: 'editar', component: CampaignEditComponent, outlet: 'campaign' },
      { path: 'info', component: CampaignInfoComponent, outlet: 'campaign' },
      { path: 'entity-links', component: EntityLinksComponent, outlet: 'campaign' }
    ]
  },
  { path: 'donor', loadChildren: () => import('./modules/donor/donor.module').then(m => m.DonorModule) },
  {
    path: 'my-donations',
    component: MyDonationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
