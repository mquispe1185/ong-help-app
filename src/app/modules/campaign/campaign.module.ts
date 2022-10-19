import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignComponent } from './campaign.component';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { CampaignDashboardComponent } from './campaign-dashboard/campaign-dashboard.component';
import { CampaignDonationsComponent } from './campaign-donations/campaign-donations.component';
import { CampaignStatisticsComponent } from './campaign-statistics/campaign-statistics.component';


@NgModule({
  declarations: [
    CampaignComponent,
    CampaignFormComponent,
    CampaignDashboardComponent,
    CampaignDonationsComponent,
    CampaignStatisticsComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    FormsModule
  ],
  exports: []
})
export class CampaignModule { }
