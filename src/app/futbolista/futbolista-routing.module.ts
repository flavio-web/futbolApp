import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewComponent } from './pages/new/new.component';
import { ListComponent } from './pages/list/list.component';
import { ShowComponent } from './pages/show/show.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'new',
        component: NewComponent
      },
      {
        path: 'edit/:id',
        component: NewComponent,
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: ':id',
        component: ShowComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FutbolistaRoutingModule { }
