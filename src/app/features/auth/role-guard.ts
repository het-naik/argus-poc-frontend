import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';
import { RoleType } from '../../core/interfaces/user';

export const roleGuard = (...allowedRoles : RoleType[]) : CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if(!auth.isLoggedIn()) {
      return router.createUrlTree(['/login']);
    }

    if(!auth.hasRole(allowedRoles)) {
      return router.createUrlTree(['/unauthorized']);
    }

    return true;
  };
};
