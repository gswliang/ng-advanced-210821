import { ColorComponent } from './color/color.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UtilitiesRoutingModule } from './utilities-routing.module';


@NgModule({
  declarations: [
    ColorComponent
  ],
  imports: [
    CommonModule,
    UtilitiesRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class UtilitiesModule { }
