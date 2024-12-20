import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FirebaseError } from 'firebase/app';
import { doc, setDoc } from 'firebase/firestore';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  protected signinForm!: FormGroup;
  protected errorFirebase!: FirebaseError;

  public ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }

  public signIn() {
    if (this.email && this.password) {
      this.signinForm.markAsPristine();
      createUserWithEmailAndPassword(this.auth, this.email.value, this.password.value)
        .then((userCredential) => {
          console.log('Utilisateur créé avec succès :', userCredential.user);
          this.userService.createUserDocumentWithId(userCredential.user.uid, 'https://risibank.fr/cache/medias/0/2/269/26952/full.gif', this.email?.value);
          this.router.navigate(['/tasks']);
        })
        .catch((error: FirebaseError) => {
          this.errorFirebase = error;
          console.error('Erreur lors de l’inscription :', error);
        });
    }
  }
}
