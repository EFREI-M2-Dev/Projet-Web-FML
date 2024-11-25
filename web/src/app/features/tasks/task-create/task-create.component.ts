import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  imports: [FormsModule],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss',
})
export class TaskCreateComponent {
  newTask = { title: 'Test1', description: 'Test2', atDate: new Date() };
  @Output() taskAdded = new EventEmitter<{
    title: string;
    description: string;
    atDate: Date;
  }>();

  addTask() {
    if (this.newTask.title.trim() && this.newTask.description.trim()) {
      this.taskAdded.emit(this.newTask);
      this.newTask = { title: '', description: '', atDate: new Date() };
    }
  }
}
