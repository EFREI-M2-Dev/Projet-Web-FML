import { inject, Injectable } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { NewTask, Task } from '../../interfaces/Task';

@Injectable({
  providedIn: 'root',
})
export class TasksFacade {
  private readonly taskService = inject(TaskService);

  public addTask(task: Task) {
    this.taskService.addTask(task).catch((error) => {
      console.error('Erreur lors de l’ajout de la tâche :', error);
    });
  }

  public toggleDone(task: Task) {
    this.taskService.updateTask(task.id!, { done: !task.done }).catch((error) => {
      console.error('Erreur lors de la mise à jour du statut de la tâche :', error);
    });
  }

  public editTask(task: Task) {
    this.taskService
      .updateTask(task.id!, { title: task.title, description: task.description })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la tâche :', error);
      });
  }

  public deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).catch((error) => {
      console.error('Erreur lors de la suppression de la tâche :', error);
    });
  }
}
