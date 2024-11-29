import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { Observable } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../../features/user/user.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, IconButtonComponent, UserComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, AfterViewInit {
  private readonly userService = inject(UserService);
  protected profilePicture$!: Observable<string>;

  @ViewChild('popover') popover!: ElementRef;

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.profilePicture$ = this.userService.getURLImage();
  }

  ngAfterViewInit(): void {}

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
