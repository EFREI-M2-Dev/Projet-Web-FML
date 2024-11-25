import { Component } from '@angular/core';
import { TaskCreateComponent } from './task-create/task-create.component';
import { Task } from '../../interfaces/Task';
import { TaskItemComponent } from './task-item/task-item.component';

@Component({
  selector: 'app-tasks',
  imports: [TaskCreateComponent, TaskItemComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  public readonly tasks: Task[] = [
    {
      id: 1,
      text: 'Test 1',
      completed: false,
    },
    {
      id: 2,
      text: 'Test 2',
      completed: true,
    },
  ];

  addTask(newTask: string) {
    if (newTask.trim()) {
      this.tasks.push({
        id: this.tasks.length + 1,
        text: newTask,
        completed: false,
      });
    }
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed;
  }

  editTask(task: Task) {
    const newName = prompt('Edit Task Name:', task.text);
    if (newName !== null && newName !== '') {
      task.text = newName;
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
