import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconButtonComponent } from '../../../shared/icon-button/icon-button.component';
import {ModalComponent} from '../../../shared/modal/modal.component';

@Component({
  selector: 'app-task-create',
  imports: [FormsModule, IconButtonComponent, ModalComponent],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss',
})
export class TaskCreateComponent {
  isModalOpen = false;
  newTask = {title: '', description: '', atDate: new Date()};
  @Output() taskAdded = new EventEmitter<{
    title: string;
    description: string;
    atDate: Date;
  }>();

  addTask() {
    if (this.newTask.title.trim() && this.newTask.description.trim()) {
      this.taskAdded.emit(this.newTask);
      this.isModalOpen = false;
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
