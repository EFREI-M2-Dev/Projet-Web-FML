import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../interfaces/Task';

@Component({
  selector: 'app-task-item',
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Input() index!: number;
  @Output() taskDeleted = new EventEmitter<void>();
  @Output() taskToggled = new EventEmitter<void>();

  toggleTask() {
    this.taskToggled.emit();
  }

  deleteTask() {
    this.taskDeleted.emit();
  }
}
