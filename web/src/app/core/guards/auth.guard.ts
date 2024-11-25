import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { take, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth); // Injection du service Firebase Auth
  const router = inject(Router); // Injection du Router pour rediriger si besoin

  return authState(auth).pipe(
    take(1), // Prendre uniquement la première émission (authentification actuelle)
    map(user => {
      if (user) {
        return true; // Autorisé si l'utilisateur est connecté
      } else {
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // Redirige vers login
        return false;
      }
    })
  );
};