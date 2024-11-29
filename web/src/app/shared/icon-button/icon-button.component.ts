import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  imports: [],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
})
export class IconButtonComponent {
  @Output() clicked: EventEmitter<void> = new EventEmitter();

  onClick(): void {
    this.clicked.emit();
  }
}
