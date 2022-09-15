import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignComponent } from './campaign.component';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CampaignComponent,
    CampaignFormComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    FormsModule
  ],
  exports: []
})
export class CampaignModule { }
