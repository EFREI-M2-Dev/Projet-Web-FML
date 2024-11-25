import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  login(email: string, password: string): Observable<any> {
    if (email === 'test@example.com' && password === 'password123') {
      this.isAuthenticated = true;
      return of({ user: { email } });  
    } else {
      return of(null);  
    }
  }

  logout(): Observable<void> {
    this.isAuthenticated = false;
    return of(undefined);  
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
