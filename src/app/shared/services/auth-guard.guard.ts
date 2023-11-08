import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';


export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const localStorageSvc = inject(LocalstorageService)
  const token = localStorageSvc.getToken()

  if (token) {
    return true
  }

  router.navigateByUrl('login')
  return false;
};
