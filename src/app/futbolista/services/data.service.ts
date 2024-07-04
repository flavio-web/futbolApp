import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../auth/services/auth.service';
import { ResponseFutbolista, ResponseShowFutbolista } from '../interfaces/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  token: string = '';
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.token = this.authService.token;
  }

  getHeaders( token: string ){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-token': token
    })
  }


  listFutbolistas(): Observable<ResponseFutbolista>{
    const options = { headers: this.getHeaders( this.token )}
    return this.http.get<ResponseFutbolista>(`${this.apiUrl}/futbolista`, options);
  }

  showFutbolista( uid: string ): Observable<ResponseShowFutbolista>{
    const options = { headers: this.getHeaders( this.token )}
    return this.http.get<ResponseShowFutbolista>(`${this.apiUrl}/futbolista/${uid}`, options);
  }

}
