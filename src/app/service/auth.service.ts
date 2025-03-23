import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  loginAPI(url: string, dados: any): any {
    console.log(dados);
    return this.http.post(`${url}/api/api/LoginAcesso/Autenticar`, dados);
  }

}
