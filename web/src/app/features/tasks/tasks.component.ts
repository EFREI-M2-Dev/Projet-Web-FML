import { Component, inject, OnInit } from '@angular/core';
import { TaskCreateComponent } from './task-create/task-create.component';
import { NewTask, Task } from '../../interfaces/Task';
import { TaskItemComponent } from './task-item/task-item.component';
import { Auth } from '@angular/fire/auth';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TasksFacade } from './tasks.facade';
import { Thematic } from '../../interfaces/Thematic';

@Component({
  selector: 'app-tasks',
  imports: [TaskCreateComponent, TaskItemComponent, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  private readonly tasksFacade = inject(TasksFacade);
  private readonly auth = inject(Auth);

  public tasksWithThematics$!: Observable<Task[]>;
  public date: Date = new Date();
  private selectedDate$ = new BehaviorSubject<Date>(this.date);
  public isTaskListEmpty$!: Observable<boolean>;

  public ngOnInit(): void {
    const user = this.auth.currentUser;

    if (user) {
      const tasks$ = this.tasksFacade.getTasks(user.uid);
      const thematics$ = this.tasksFacade.getThematics();

      this.tasksWithThematics$ = combineLatest([tasks$, thematics$, this.selectedDate$]).pipe(
        map(([tasks, thematics, selectedDate]) => {
          const thematicsMap = thematics.reduce(
            (acc, thematic) => {
              acc[thematic.id] = thematic;
              return acc;
            },
            {} as { [id: string]: Thematic },
          );

          return tasks
            .filter((task) => this.isSameDate(task.atDate, selectedDate))
            .map((task) => ({
              ...task,
              thematicLabel: thematicsMap[task.thematic]?.label || 'Unknown',
              thematicColor: thematicsMap[task.thematic]?.color || '#ccc',
            }));
        }),
      );

      console.log(this.tasksWithThematics$);
      this.isTaskListEmpty$ = this.tasksWithThematics$.pipe(map((tasks) => tasks.length === 0));
    } else {
      this.tasksWithThematics$ = new Observable();
      this.isTaskListEmpty$ = new Observable((observer) => observer.next(true));
    }
  }

  public onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedDate = input.valueAsDate;
    console.log('Selected Date:', selectedDate);
    if (selectedDate) {
      this.setDate(selectedDate);
    } else {
      console.error('Invalid date selected');
    }
  }

  public setDate(date: Date) {
    if (date) {
      this.selectedDate$.next(date);
    } else {
      console.error('Invalid date passed to setDate');
    }
  }

  private isSameDate(taskDate: string | Date, selectedDate: Date): boolean {
    const taskDateObj = new Date(taskDate);
    return (
      taskDateObj.getFullYear() === selectedDate.getFullYear() &&
      taskDateObj.getMonth() === selectedDate.getMonth() &&
      taskDateObj.getDate() === selectedDate.getDate()
    );
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
