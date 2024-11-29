import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../interfaces/Task';
import { TasksFacade } from '../tasks.facade';
import { Thematic } from '../../../interfaces/Thematic';

@Component({
  selector: 'app-task-edit-modal',
  imports: [FormsModule],
  templateUrl: './task-edit-modal.component.html',
  styleUrl: './task-edit-modal.component.scss',
})
export class TaskEditModalComponent implements OnInit {
  @Input() public isModalOpen = false;
  @Input() public task: Task = {
    title: '',
    description: '',
    done: false,
    atDate: new Date(),
    userUID: '',
    thematic: '',
  };

  private readonly tasksFacade = inject(TasksFacade);

  public thematics: Thematic[] = [];

  public ngOnInit(): void {
    this.tasksFacade.getThematics().subscribe((thematics) => {
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
