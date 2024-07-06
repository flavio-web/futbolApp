import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FutbolistaRoutingModule } from './futbolista-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from '../material/material/material.module';
import { ListComponent } from './pages/list/list.component';
import { NewComponent } from './pages/new/new.component';
import { ShowComponent } from './pages/show/show.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FutbolImgPipe } from './pipes/futbol-img.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    NewComponent,
    ShowComponent,
    FutbolImgPipe
  ],
  imports: [
    CommonModule,
    FutbolistaRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FutbolistaModule { }
