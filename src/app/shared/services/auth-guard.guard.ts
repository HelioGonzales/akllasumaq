import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const localStorageSvc = inject(LocalstorageService)
  const token = localStorageSvc.getToken()
  const _tokenExpired = (expiration: number): boolean => {
    return Math.floor(new Date().getTime()) / 1000 >= expiration
  }

  if (token) {
    const tokenDecode = JSON.parse(atob(token.split('.')[1]))

    if (tokenDecode.isAdmin && !_tokenExpired(tokenDecode.exp)) {
      return true
    }
  }

  router.navigateByUrl('login')
  return false;
};
