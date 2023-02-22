import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './guards/auth.guard';
import { MyDonationsComponent } from './modules/donor/my-donations/my-donations.component';
import { OngComponent } from './modules/ong/ong.component';
import { CampaignComponent } from './modules/campaign/campaign.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  {
    path: 'ong',
    component: OngComponent
  },
  {
    path: 'campaign',
    component: CampaignComponent
  },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'ong-dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/ong/ong.module').then(m => m.OngModule)
  },
  {
    path: 'campaign-dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/campaign/campaign.module').then(m => m.CampaignModule)
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
