import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../interfaces/Task';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-task-item',
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Input() index!: number;
  @Output() taskDeleted = new EventEmitter<void>();
  @Output() taskToggled = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Task>();

  toggleTask() {
    this.taskToggled.emit();
  }

  deleteTask() {
    this.taskDeleted.emit();
  }

  onEdit() {
    this.edit.emit(this.task);
  }
}
