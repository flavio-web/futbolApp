import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, ResponseLogin, User } from '../interfaces/auth.interface';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  getHeaders( token: string ){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-token': token
    })
  }

  constructor(
    private http: HttpClient
  ) { }

  set token( token: string ){
    localStorage.setItem('token', token);
  }
  get token(){
    return localStorage.getItem('token') || '';
  }

  set user( usuario: User ){
    localStorage.setItem('user', JSON.stringify(usuario) );
  }

  get user(): User | undefined {
    return JSON.parse(localStorage.getItem('user') as string) as User || undefined;
  }

  removeItemLocalStorage( item: string ){
    localStorage.removeItem( item );
  }

  login( data: Login ): Observable<ResponseLogin>{
    const options = { headers: this.headers };
    return this.http.post<ResponseLogin>(`${this.apiUrl}/auth/login`, data, options );
  }

  validarToken(): Observable<boolean>{
    const options = { headers: this.getHeaders( this.token )}
    return this.http.get<ResponseLogin>(`${this.apiUrl}/auth/validated-token`, options ).pipe(
      map( respuesta => {
          return respuesta.status;
      }), catchError(async resp => {
        return await false;
      })
    )
  }
}
