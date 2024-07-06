import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Futbolista, PosicionFutbol } from '../../interfaces/interface';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent implements OnInit {

  futbolistaForm: FormGroup = this.fb.group({
    uid: [ '' ],
    nombre: ['', [Validators.required]],
    imagen: ['', [Validators.required]],
    posicion: ['', [Validators.required]],
    apodo: ['', []],
    nacionalidad: ['', [Validators.required]],
    equipos: ['', []],
    usuario: ['', [Validators.required]],
  });

  posiciones: PosicionFutbol[] = [];

  futbolista?: Futbolista;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.dataService.posicionesJson.subscribe( posiciones => {
      this.posiciones = posiciones
    });

    this.futbolistaForm.get('usuario')?.setValue( this.authService.user?.uid );


    this.activateRoute.params.pipe(
      switchMap( ({ id }) => this.dataService.showFutbolista( id) ),
    )
    .subscribe( ({ result }) =>{
      console.log({result});
      if( !result ) return this.router.navigate(['/futbolista/list']);

      this.futbolista = { ...result };

      this.futbolistaForm.reset( this.futbolista );
      return;
    });

  }


  async guardarFutbolista(){
    if( this.futbolistaForm.invalid ){
      this.futbolistaForm.markAllAsTouched();
      return;
    }

    if( this.futbolista?.uid ){
      //actualizar
      await this.dataService.updateFutbolista( this.futbolistaForm.value ).subscribe( ({ status, message, result }) =>{
        if( !status ){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: message,
          });
          return;
        }

        Swal.fire({
          icon: "success",
          title: "Bien Hecho!",
          text: message,
        });
      })

      return;
    }

    //Grabar
    await this.dataService.saveFutbolista( this.futbolistaForm.value ).subscribe( ({ status, message, result }) =>{
      if( !status ){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Bien Hecho!",
        text: message,
      });

      this.router.navigate(['/futbolista/edit', result.uid]);

    });
  }

  async deleteFutbolista(){
    if( !this.futbolista?.uid ){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'El identificador del futbolista es obligatorio.',
      });
      return;
    }

    Swal.fire({
      title: "Estas seguro de eliminarlo?",
      text: `Se va a eliminar el futbolista ${this.futbolista.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#673ab7",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        console.log( "se va a eliminar");
        await this.dataService.deleteteFutbolista( this.futbolista?.uid! ).subscribe( ({ status, message, result }) => {
          if( !status ){
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: message,
            });
            return;
          }

          Swal.fire({
            icon: "success",
            title: "Bien Hecho!",
            text: message,
          });

          this.router.navigate(['/futbolista/list']);
        })
      }else{
        console.log("algo salio mal")
      }
    });


  }
}
