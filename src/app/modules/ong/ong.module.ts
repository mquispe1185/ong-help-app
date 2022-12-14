import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OngRoutingModule } from './ong-routing.module';
import { OngComponent } from './ong.component';
import { OngFormComponent } from './ong-form/ong-form.component';
import { OngDashboardComponent } from './ong-dashboard/ong-dashboard.component';
import { OngFixedCostsComponent } from './ong-fixed-costs/ong-fixed-costs.component';
import { OngDonationsComponent } from './ong-donations/ong-donations.component';
import { OngEditComponent } from './ong-edit/ong-edit.component';
import { OngDonationListComponent } from './ong-donation-list/ong-donation-list.component';

@NgModule({
  declarations: [
    OngComponent,
    OngFormComponent,
    OngDashboardComponent,
    OngFixedCostsComponent,
    OngDonationsComponent,
    OngEditComponent,
    OngDonationListComponent,
  ],
  imports: [
    CommonModule,
    OngRoutingModule,
    FormsModule
  ],
  exports: []
})
export class OngModule { }
