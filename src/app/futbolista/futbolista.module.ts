import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FutbolistaRoutingModule } from './futbolista-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from '../material/material/material.module';
import { ListComponent } from './pages/list/list.component';
import { NewComponent } from './pages/new/new.component';
import { ShowComponent } from './pages/show/show.component';


@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    NewComponent,
    ShowComponent
  ],
  imports: [
    CommonModule,
    FutbolistaRoutingModule,
    MaterialModule
  ]
})
export class FutbolistaModule { }
