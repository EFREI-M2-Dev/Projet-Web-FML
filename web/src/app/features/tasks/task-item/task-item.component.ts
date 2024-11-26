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
  @Input() public task!: Task;
  @Output() public taskDeleted = new EventEmitter<string>();
  @Output() public taskToggled = new EventEmitter<Task>();
  @Output() public edit = new EventEmitter<Task>();

  public toggleTask() {
    this.taskToggled.emit(this.task);
  }

  public deleteTask() {
    const isConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?');
    if (isConfirmed) {
      this.taskDeleted.emit(this.task.id);
    }
  }

  public onEdit() {
    this.edit.emit(this.task);
  }
}
