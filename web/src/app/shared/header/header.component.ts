import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Auth, signOut} from '@angular/fire/auth';
import {IconButtonComponent} from '../icon-button/icon-button.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, IconButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private auth: Auth, private router: Router) {}


  logout() {
    signOut(this.auth)
      .then(() => {
        console.log('Déconnexion réussie');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Erreur lors de la déconnexion :', error);
      });
  }

  isLogged() {
    return this.auth.currentUser !== null;
  }
}
