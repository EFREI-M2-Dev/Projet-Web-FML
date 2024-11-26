import { Component } from '@angular/core';
import { TaskCreateComponent } from './task-create/task-create.component';
import { Task } from '../../interfaces/Task';
import { TaskItemComponent } from './task-item/task-item.component';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { TaskService } from '../../core/services/task.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from '../../shared/icon-button/icon-button.component';

@Component({
  selector: 'app-tasks',
  imports: [
    TaskCreateComponent,
    TaskItemComponent,
    IconButtonComponent,
    CommonModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  public completedTasks$: Observable<Task[]>;
  public pendingTasks$: Observable<Task[]>;

  constructor(
    private taskService: TaskService,
    private auth: Auth,
    private router: Router
  ) {
    const user = this.auth.currentUser;
    if (user) {
      const allTasks$ = this.taskService.getTasks(user.uid);

      this.completedTasks$ = allTasks$.pipe(
        map((tasks) => tasks.filter((task) => task.done))
      );

      this.pendingTasks$ = allTasks$.pipe(
        map((tasks) => tasks.filter((task) => !task.done))
      );
    } else {
      this.completedTasks$ = new Observable();
      this.pendingTasks$ = new Observable();
    }
  }

  toggleDone(task: Task) {
    this.taskService
      .updateTask(task.id!, { done: !task.done })
      .catch((error) => {
        console.error(
          'Erreur lors de la mise à jour du statut de la tâche :',
          error
        );
      });
  }

  editTask(task: Task) {
    const newTitle = prompt('Modifier le titre de la tâche :', task.title);
    const newDescription = prompt(
      'Modifier la description de la tâche :',
      task.description
    );

    if (newTitle && newDescription) {
      this.taskService
        .updateTask(task.id!, { title: newTitle, description: newDescription })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour de la tâche :', error);
        });
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


}
