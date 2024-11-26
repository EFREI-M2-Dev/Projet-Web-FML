import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(
    private auth: Auth,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  login() {
    this.errorMessage = null;

    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/tasks';
        this.router.navigate([returnUrl]);
      })
      .catch((error) => {
        console.error('Erreur de connexion', error);
        this.errorMessage = this.getErrorMessage(error.code);
      });
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/invalid-credential':
        return 'Identifiants invalide.';
      default:
        return 'Une erreur inattendue est survenue. Veuillez réessayer.';
    }
  }
}
