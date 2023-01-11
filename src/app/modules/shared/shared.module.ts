import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkLoaderComponent } from './link-loader/link-loader.component';
import { RouterModule } from '@angular/router';
import { EntityLinksComponent } from './entity-links/entity-links.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LinkLoaderComponent,
    EntityLinksComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    LinkLoaderComponent,
    EntityLinksComponent
  ]
})
export class SharedModule { }
