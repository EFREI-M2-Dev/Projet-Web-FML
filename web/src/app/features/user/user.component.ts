import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../interfaces/User';
import { Observable } from 'rxjs/internal/Observable';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  private readonly userService = inject(UserService);
  protected user$!: Observable<User>;

  ngOnInit() {
    this.user$ = this.userService.getUserDataFromFirebase();
  }
}
