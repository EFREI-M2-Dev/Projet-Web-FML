import { Component } from '@angular/core';
import { TaskCreateComponent } from './task-create/task-create.component';
import { NewTask, Task } from '../../interfaces/Task';
import { TaskItemComponent } from './task-item/task-item.component';
import { Auth } from '@angular/fire/auth';
import { TaskService } from '../../core/services/task.service';
import { combineLatest, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TasksFacade } from './tasks.facade';
import { ThematicService } from '../../core/services/thematic.service';
import { Thematic } from '../../interfaces/Thematic';

@Component({
  selector: 'app-tasks',
  imports: [TaskCreateComponent, TaskItemComponent, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  public tasksWithThematics$: Observable<Task[]>;

  constructor(
    private taskService: TaskService,
    private thematicService: ThematicService,
    private auth: Auth,
    private tasksFacade: TasksFacade,
  ) {
    const user = this.auth.currentUser;
    if (user) {
      const tasks$ = this.taskService.getTasks(user.uid);
      const thematics$ = this.thematicService.getThematics();

      this.tasksWithThematics$ = combineLatest([tasks$, thematics$]).pipe(
        map(([tasks, thematics]) => {
          const thematicsMap = thematics.reduce(
            (acc, thematic) => {
              acc[thematic.id] = thematic;
              return acc;
            },
            {} as { [id: string]: Thematic },
          );

          return tasks.map((task) => ({
            ...task,
            thematicLabel: thematicsMap[task.thematic]?.label || 'Unknown',
            thematicColor: thematicsMap[task.thematic]?.color || '#ccc',
          }));
        }),
      );
    } else {
      this.tasksWithThematics$ = new Observable();
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
