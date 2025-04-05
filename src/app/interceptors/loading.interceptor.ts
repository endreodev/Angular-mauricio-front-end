import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';


import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service'; // Certifique-se de criar este serviço

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Exibir o loading
    this.loadingService.show();

    // Adicionar o token Bearer
    const token = localStorage.getItem('token');
    const clonedRequest = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(clonedRequest).pipe(
      finalize(() => {
        // Ocultar o loading
        this.loadingService.hide();
      })
    );
  }
}
