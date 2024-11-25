import { Component } from '@angular/core';
import { TaskCreateComponent } from './task-create/task-create.component';
import { Task } from '../../interfaces/Task';
import { TaskItemComponent } from './task-item/task-item.component';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { TaskService } from '../../core/services/task.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from '../../shared/icon-button/icon-button.component';

@Component({
  selector: 'app-tasks',
  imports: [TaskCreateComponent, TaskItemComponent, IconButtonComponent, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  public tasks$: Observable<Task[]>; 

  constructor(
    private taskService: TaskService,
    private auth: Auth,
    private router: Router
  ) {
    const user = this.auth.currentUser;
    if (user) {
      this.tasks$ = this.taskService.getTasks(user.uid);
    } else {
      this.tasks$ = new Observable(); 
    }
  }

  addTask(newTask: { title: string; description: string; atDate: Date }) {
    const user = this.auth.currentUser;
    if (user) {
      const task: Task = {
        ...newTask,
        done: false,
        userUID: user.uid,
      };
      this.taskService.addTask(task).catch((error) => {
        console.error('Erreur lors de l’ajout de la tâche :', error);
      });
    }
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).catch((error) => {
      console.error('Erreur lors de la suppression de la tâche :', error);
    });
  }

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
}
