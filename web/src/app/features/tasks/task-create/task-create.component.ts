import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconButtonComponent } from '../../../shared/icon-button/icon-button.component';
import { NewTask } from '../../../interfaces/Task';
import { ThematicService } from '../../../core/services/thematic.service';
import { Thematic } from '../../../interfaces/Thematic';

@Component({
  selector: 'app-task-create',
  imports: [FormsModule, IconButtonComponent],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss',
})
export class TaskCreateComponent {
  @Output() public taskAdded = new EventEmitter<NewTask>();

  public isModalOpen = false;
  public newTask: NewTask = { title: '', description: '', atDate: new Date(), thematic: '' };
  public thematics: Thematic[] = [];

  constructor(private thematicService: ThematicService) {
    this.thematicService.getThematics().subscribe((thematics) => {
      this.thematics = thematics;
    });
  }

  public addTask() {
    if (this.newTask.title.trim() && this.newTask.description.trim() && this.newTask.thematic) {
      this.newTask.atDate = new Date(this.newTask.atDate);
      this.taskAdded.emit(this.newTask);

      this.resetModal();
    }
  }

  private resetModal() {
    this.isModalOpen = false;
    this.newTask = { title: '', description: '', atDate: new Date(), thematic: '' };
  }

  public openModal() {
    this.isModalOpen = true;
  }

  public closeModal() {
    this.isModalOpen = false;
  }
}
