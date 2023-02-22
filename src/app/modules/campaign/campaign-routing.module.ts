import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityLinksComponent } from '../shared/entity-links/entity-links.component';
import { CampaignDashboardComponent } from './campaign-dashboard/campaign-dashboard.component';
import { CampaignDonationListComponent } from './campaign-donation-list/campaign-donation-list.component';
import { CampaignDonationsComponent } from './campaign-donations/campaign-donations.component';
import { CampaignEditComponent } from './campaign-edit/campaign-edit.component';
import { CampaignFixedCostsComponent } from './campaign-fixed-costs/campaign-fixed-costs.component';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { CampaignInfoComponent } from './campaign-info/campaign-info.component';
import { CampaignStatisticsComponent } from './campaign-statistics/campaign-statistics.component';

const routes: Routes = [

  { path: '', component: CampaignDashboardComponent,
    children: [
      { path: 'estadisticas', component: CampaignStatisticsComponent },
      { path: 'costos-fijos', component: CampaignFixedCostsComponent },
      { path: 'solicitar-donaciones', component: CampaignDonationsComponent },
      { path: 'ver-donaciones', component: CampaignDonationListComponent },
      { path: 'editar', component: CampaignEditComponent },
      { path: 'info', component: CampaignInfoComponent },
      { path: 'entity-links', component: EntityLinksComponent }
    ] },
  { path: 'campaign-form', component: CampaignFormComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
