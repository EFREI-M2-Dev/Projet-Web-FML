import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../interfaces/Task';
import { TasksFacade } from '../tasks.facade';
import { ThematicService } from '../../../core/services/thematic.service';
import { Thematic } from '../../../interfaces/Thematic';

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
    thematic: '',
  };

  public thematics: Thematic[] = [];

  constructor(
    private tasksFacade: TasksFacade,
    private thematicService: ThematicService,
  ) {
    this.thematicService.getThematics().subscribe((thematics) => {
      this.thematics = thematics;
    });
  }

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
