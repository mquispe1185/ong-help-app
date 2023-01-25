import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignComponent } from './campaign.component';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { CampaignDashboardComponent } from './campaign-dashboard/campaign-dashboard.component';
import { CampaignDonationsComponent } from './campaign-donations/campaign-donations.component';
import { CampaignStatisticsComponent } from './campaign-statistics/campaign-statistics.component';
import { CampaignFixedCostsComponent } from './campaign-fixed-costs/campaign-fixed-costs.component';
import { CampaignDonationListComponent } from './campaign-donation-list/campaign-donation-list.component';
import { CampaignEditComponent } from './campaign-edit/campaign-edit.component';
import { CampaignInfoComponent } from './campaign-info/campaign-info.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { SharedModule } from '../shared/shared.module';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  declarations: [
    CampaignComponent,
    CampaignFormComponent,
    CampaignDashboardComponent,
    CampaignDonationsComponent,
    CampaignStatisticsComponent,
    CampaignFixedCostsComponent,
    CampaignDonationListComponent,
    CampaignEditComponent,
    CampaignInfoComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    FormsModule,
    ImageCropperModule,
    YouTubePlayerModule,
    SharedModule,
    TagInputModule,
  ],
  exports: []
})
export class CampaignModule { }
