import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../interfaces/Task';
import { TasksFacade } from '../tasks.facade';

@Component({
  selector: 'app-task-edit-modal',
  imports: [FormsModule],
  templateUrl: './task-edit-modal.component.html',
  styleUrl: './task-edit-modal.component.scss',
})
export class TaskEditModalComponent {
  @Input() public isModalOpen = false;
  @Input() public task: Task = {
    title: '',
    description: '',
    done: false,
    atDate: new Date(),
    userUID: '',
  };

  private tasksFacade = inject(TasksFacade);

  public editTask() {
    this.tasksFacade.editTask(this.task);

    this.closeModal();
  }

  public openModal() {
    this.isModalOpen = true;
  }

  public closeModal() {
    this.isModalOpen = false;
  }
}
