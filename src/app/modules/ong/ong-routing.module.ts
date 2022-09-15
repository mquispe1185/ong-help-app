import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OngComponent } from './ong.component';

const routes: Routes = [{ path: '', component: OngComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OngRoutingModule { }
