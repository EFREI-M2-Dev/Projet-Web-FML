import { Routes } from '@angular/router';

export const routes: Routes = [
  //   { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () =>
      import('./features/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./features/tasks/tasks.component').then((c) => c.TasksComponent),
  },
  //   { path: '**', redirectTo: '/login' },
];
