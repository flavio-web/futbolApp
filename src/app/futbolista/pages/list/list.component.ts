import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Futbolista } from '../../interfaces/interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  futbolistas: Futbolista[] = [];

  constructor(
    private dataService: DataService
  ){}

  ngOnInit(): void {
    this.getAllFutbolistas();
  }

  async getAllFutbolistas(){
    await this.dataService.listFutbolistas().subscribe( ({ result }) => {
      console.log( result );
      this.futbolistas = [ ...result ];
    })
  }
}
