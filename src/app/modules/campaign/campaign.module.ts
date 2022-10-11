import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignComponent } from './campaign.component';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';


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
