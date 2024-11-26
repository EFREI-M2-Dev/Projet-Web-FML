import { Component } from '@angular/core';
import { TaskCreateComponent } from './task-create/task-create.component';
import { NewTask, Task } from '../../interfaces/Task';
import { TaskItemComponent } from './task-item/task-item.component';
import { Auth } from '@angular/fire/auth';
import { TaskService } from '../../core/services/task.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TasksFacade } from './tasks.facade';

@Component({
  selector: 'app-tasks',
  imports: [TaskCreateComponent, TaskItemComponent, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  public tasks$: Observable<Task[]>;

  constructor(
    private taskService: TaskService,
    private auth: Auth,
    private tasksFacade: TasksFacade,
  ) {
    const user = this.auth.currentUser;
    if (user) {
      this.tasks$ = this.taskService.getTasks(user.uid);
    } else {
      this.tasks$ = new Observable();
    }
  }

  public toggleDone(task: Task) {
    this.tasksFacade.toggleDone(task);
  }

  public addTask(newTask: NewTask) {
    const user = this.auth.currentUser;
    if (user) {
      const task: Task = {
        ...newTask,
        done: false,
        userUID: user.uid,
      };
      this.tasksFacade.addTask(task);
    }
  }

  public deleteTask(taskId: string) {
    this.tasksFacade.deleteTask(taskId);
  }
}
