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
      text: 'Test 1',
      completed: false,
    },
    {
      text: 'Test 2',
      completed: true,
    },
  ];

  addTask(newTask: string) {
    if (newTask.trim()) {
      this.tasks.push({ text: newTask, completed: false });
    }
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
