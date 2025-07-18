import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }

    const usuario = this.authService.getUsuarioAutenticado();
    const role = usuario?.permissao;

    if (role === 'ROLE_LOCADOR' || role === 'ROLE_LOCATARIO') {
      return true;
    }

    this.router.navigate(['/forbidden']);
    return false;
  }
}
