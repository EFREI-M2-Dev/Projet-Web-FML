import { Component, Input } from '@angular/core';
import { Task } from '../../../interfaces/Task';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task: Task = {
    name: 'Hey',
    done: false
  }
}
