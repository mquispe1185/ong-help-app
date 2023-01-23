import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonorRoutingModule } from './donor-routing.module';
import { DonorComponent } from './donor.component';
import { MyDonationsComponent } from './my-donations/my-donations.component';


@NgModule({
  declarations: [
    DonorComponent,
    MyDonationsComponent
  ],
  imports: [
    CommonModule,
    DonorRoutingModule
  ]
})
export class DonorModule { }
