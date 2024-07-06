import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { validarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'futbolista',
    loadChildren: () => import('./futbolista/futbolista.module').then( m => m.FutbolistaModule),
    canActivate: [ validarTokenGuard ]
  },
  {
    path: '**',
    redirectTo: 'futbolista'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
