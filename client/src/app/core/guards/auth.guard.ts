import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthState } from '../services/auth-state';

export const authGuard: CanActivateFn = (route, state) => {
  const authStateService = inject(AuthState);
  const router = inject(Router);

  if (authStateService.isLoggedIn) {
    return true;
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authStateService = inject(AuthState);
  const router = inject(Router);

  if (authStateService.isLoggedIn && authStateService.isAdmin) {
    return true;
  }

  if (!authStateService.isLoggedIn) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  } else {
    router.navigate(['/dashboard']);
  }
  return false;
};

export const guestGuard: CanActivateFn = (route, state) => {
  const authStateService = inject(AuthState);
  const router = inject(Router);

  if (!authStateService.isLoggedIn) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
