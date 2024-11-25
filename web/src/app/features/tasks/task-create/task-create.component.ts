import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  imports: [FormsModule],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss',
})
export class TaskCreateComponent {
  newTask: string = '';
  @Output() taskAdded = new EventEmitter<string>();

  addTask() {
    if (this.newTask.trim()) {
      this.taskAdded.emit(this.newTask);
      this.newTask = ''; 
    }
  }
}
