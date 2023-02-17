import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityLinksComponent } from '../shared/entity-links/entity-links.component';
import { OngDashboardComponent } from './ong-dashboard/ong-dashboard.component';
import { OngDonationListComponent } from './ong-donation-list/ong-donation-list.component';
import { OngDonationsComponent } from './ong-donations/ong-donations.component';
import { OngEditComponent } from './ong-edit/ong-edit.component';
import { OngFixedCostsComponent } from './ong-fixed-costs/ong-fixed-costs.component';
import { OngFormComponent } from './ong-form/ong-form.component';
import { OngInfoComponent } from './ong-info/ong-info.component';

const routes: Routes = [

  { path: '', component: OngDashboardComponent,
    children: [
      { path: 'costos-fijos', component: OngFixedCostsComponent },
      { path: 'solicitar-donaciones', component: OngDonationsComponent },
      { path: 'ver-donaciones', component: OngDonationListComponent },
      { path: 'editar', component: OngEditComponent },
      { path: 'info', component: OngInfoComponent },
      { path: 'entity-links', component: EntityLinksComponent }

    ] },
  { path: 'ong-form', component: OngFormComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OngRoutingModule { }
