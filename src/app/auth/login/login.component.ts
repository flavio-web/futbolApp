import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  loginForm: FormGroup = this.fb.group({
    email   : ['mario@google.com', [ Validators.required, Validators.pattern( this.emailPattern ) ]],
    password: ['admin123', [ Validators.required ]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){}

  async login(){

    if( this.loginForm.invalid ){
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log( this.loginForm.value );

    await this.authService.login(  this.loginForm.value ).subscribe( ({ status, message, result, token }) => {
      console.log({ status, message, result, token });
      if( !status ){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
        return;
      }

      this.authService.token = token!;
      this.authService.user = result!;
      this.router.navigate(['/futbolista']);

    }, ( errors ) => {
      console.log('error', errors);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errors.error.message,
      });
    });

  }

}
