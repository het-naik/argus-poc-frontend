import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';
import { RoleType } from '../../core/interfaces/user';

export const ownerOrAdminGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if(!auth.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  const user = auth.getUser();
  const idInUrl = route.paramMap.get('id');

  if(user.role === RoleType.ADMIN || user.id === idInUrl) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
  
};
