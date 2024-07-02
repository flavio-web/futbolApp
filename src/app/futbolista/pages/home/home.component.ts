import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  sidebarItems = [
    {
      label: 'Listado',
      icon: 'list',
      url: './list'
    },
    {
      label: 'Añadir',
      icon: 'add',
      url: './new'
    },
    {
      label: 'Buscar',
      icon: 'search',
      url: './search'
    },
  ];

}
