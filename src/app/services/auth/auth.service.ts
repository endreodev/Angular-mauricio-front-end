import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { environment } from '../../../environments/env';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {}

  login( dados: any): any {
    return this.http.post(`${environment.apiUrl}/login`, dados);
  }

}
