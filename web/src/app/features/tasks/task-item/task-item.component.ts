import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../interfaces/Task';
import { CommonModule } from '@angular/common';
import { TaskEditModalComponent } from '../task-edit-modal/task-edit-modal.component';

@Component({
  selector: 'app-task-item',
  imports: [CommonModule, TaskEditModalComponent],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() public task!: Task;
  @Output() public taskDeleted = new EventEmitter<string>();
  @Output() public taskToggled = new EventEmitter<Task>();

  public toggleTask() {
    this.taskToggled.emit(this.task);
  }

  public deleteTask() {
    const isConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?');
    if (isConfirmed) {
      this.taskDeleted.emit(this.task.id);
    }
  }
}
