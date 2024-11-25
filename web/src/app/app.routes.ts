import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/tasks/tasks.component').then((c) => c.TasksComponent)
    }
];
