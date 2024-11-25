import { Component } from '@angular/core';
import { TaskCreateComponent } from "./task-create/task-create.component";

interface Task {
  name: string,
  done: boolean
}

@Component({
  selector: 'app-tasks',
  imports: [TaskCreateComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  public readonly tasks: Task[] = [
    {
      name: 'Test 1',
      done: false
    },
    {
      name: 'Test 2',
      done: true
    }
  ]
}
