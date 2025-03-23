import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Recupere o token do serviço de autenticação
    // const authToken = this.authService.getToken('',);

    // Clone a requisição e adicione o token no header Authorization
    // if (authToken) {
    //   const authReq = req.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${authToken}`,
    //     },
    //   });

      // Envie a requisição clonada com o token
      return next.handle(authReq);
    }

    // Se não houver token, envie a requisição original
    return next.handle(req);
  }
}