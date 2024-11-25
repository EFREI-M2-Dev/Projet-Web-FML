import { Component } from '@angular/core';
import { TaskCreateComponent } from './task-create/task-create.component';
import { Task } from '../../interfaces/Task';
import { TaskItemComponent } from "./task-item/task-item.component";

@Component({
  selector: 'app-tasks',
  imports: [TaskCreateComponent, TaskItemComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  public readonly tasks: Task[] = [
    {
      name: 'Test 1',
      done: false,
    },
    {
      name: 'Test 2',
      done: true,
    },
  ];
}
