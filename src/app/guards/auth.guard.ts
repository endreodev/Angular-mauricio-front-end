import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const institutosComAcesso = JSON.parse(localStorage.getItem('institutosComAcesso') || '[]');

    const hasAccess = institutosComAcesso.some( (instituto:any) => instituto.dados_acesso && instituto.dados_acesso !== null);

    if (!hasAccess) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
