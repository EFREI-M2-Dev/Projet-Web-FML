import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../interfaces/Task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Input() index!: number;
  @Output() taskDeleted = new EventEmitter<string>();
  @Output() taskToggled = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<Task>();

  toggleTask() {
    this.taskToggled.emit(this.task);
  }

  deleteTask() {
    this.taskDeleted.emit(this.task.id);
  }

  onEdit() {
    this.edit.emit(this.task);
  }
}