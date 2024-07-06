import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../auth/services/auth.service';
import { Futbolista, PosicionFutbol, ResponseFutbolista, ResponseSaveFutbolista, ResponseShowFutbolista } from '../interfaces/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  get posicionesJson(){
    return this.http.get<PosicionFutbol[]>('json/posicionesFutbol.json');
  }

  getHeaders( token: string ){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-token': token
    })
  }


  listFutbolistas(): Observable<ResponseFutbolista>{
    const options = { headers: this.getHeaders( this.authService.token )}
    return this.http.get<ResponseFutbolista>(`${this.apiUrl}/futbolista`, options);
  }

  showFutbolista( uid: string ): Observable<ResponseShowFutbolista>{
    const options = { headers: this.getHeaders( this.authService.token )}
    return this.http.get<ResponseShowFutbolista>(`${this.apiUrl}/futbolista/${uid}`, options);
  }

  saveFutbolista( data: Futbolista ): Observable<ResponseSaveFutbolista>{
    const options = { headers: this.getHeaders( this.authService.token )}
    return this.http.post<ResponseSaveFutbolista>(`${this.apiUrl}/futbolista/`, data, options);
  }

  updateFutbolista( data: Futbolista ): Observable<ResponseSaveFutbolista>{
    const options = { headers: this.getHeaders( this.authService.token )}
    return this.http.put<ResponseSaveFutbolista>(`${this.apiUrl}/futbolista/${data.uid}`, data, options);
  }

  deleteteFutbolista( uid: string ): Observable<ResponseSaveFutbolista>{
    const options = { headers: this.getHeaders( this.authService.token )}
    return this.http.delete<ResponseSaveFutbolista>(`${this.apiUrl}/futbolista/${uid}`, options);
  }

}
