import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit{

  private readonly formBuilder = inject(FormBuilder);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected signinForm!: FormGroup;
  
  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }

  signIn() {
    if (this.email && this.password) {
      createUserWithEmailAndPassword(this.auth, this.email.value, this.password.value)
        .then((userCredential) => {
          console.log('Utilisateur créé avec succès :', userCredential.user);
          this.router.navigate(['/tasks']); // Redirige après l'inscription
        })
        .catch((error) => {
          console.error('Erreur lors de l’inscription :', error);
          // this.errorMessage = this.getErrorMessage(error.code);
        });
    }
  }

}

