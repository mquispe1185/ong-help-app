import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OngRoutingModule } from './ong-routing.module';
import { OngComponent } from './ong.component';
import { OngFormComponent } from './ong-form/ong-form.component';

@NgModule({
  declarations: [
    OngComponent,
    OngFormComponent,
  ],
  imports: [
    CommonModule,
    OngRoutingModule,
    FormsModule
  ],
  exports: []
})
export class OngModule { }
