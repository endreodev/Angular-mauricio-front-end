import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { environment } from '../../../environments/env';
import { LoginModel } from '../../model/auth/login.model';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {}

  login(body: LoginModel): any {
    return this.http.post(`${environment.apiUrl}/login`, body);
  }

}
