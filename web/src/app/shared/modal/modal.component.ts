import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() task = {title: '', description: '', atDate: new Date()};
  @Output() modalClosed = new EventEmitter<void>();
  @Output() taskAdded = new EventEmitter<{
    title: string;
    description: string;
    atDate: Date;
  }>();

  closeModal() {
    this.modalClosed.emit();
  }

  addTask() {
    this.taskAdded.emit(this.task);
    this.task = {title: '', description: '', atDate: new Date()};
  }
}
