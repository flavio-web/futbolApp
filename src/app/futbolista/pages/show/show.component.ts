import { Component, OnInit } from '@angular/core';
import { Futbolista } from '../../interfaces/interface';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent implements OnInit {

  futbolista!: Futbolista;

  constructor(
    private dataService: DataService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.activateRoute.params.pipe(
      switchMap( ({ id }) => this.dataService.showFutbolista( id) ),
    )
    .subscribe( ({ result }) =>{
      console.log({result});
      if( !result ) return this.router.navigate(['/futbolista/list']);

      this.futbolista = { ...result };
      return;
    });
  }

  goBack(){
    this.router.navigate(['/futbolista/list']);
  }

}
