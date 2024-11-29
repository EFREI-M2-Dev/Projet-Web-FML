import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { take, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    take(1),
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }),
  );
};
