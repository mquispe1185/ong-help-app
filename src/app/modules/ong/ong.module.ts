import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OngRoutingModule } from './ong-routing.module';
import { OngComponent } from './ong.component';
import { OngFormComponent } from './ong-form/ong-form.component';
import { OngDashboardComponent } from './ong-dashboard/ong-dashboard.component';

@NgModule({
  declarations: [
    OngComponent,
    OngFormComponent,
    OngDashboardComponent,
  ],
  imports: [
    CommonModule,
    OngRoutingModule,
    FormsModule
  ],
  exports: []
})
export class OngModule { }
