import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../interfaces/User';
import { Observable } from 'rxjs/internal/Observable';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconButtonComponent } from '../../shared/icon-button/icon-button.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [CommonModule, ReactiveFormsModule, IconButtonComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit, OnDestroy {
  private readonly userService = inject(UserService);
  private readonly formBuilder = inject(FormBuilder);

  protected profilePictureForm!: FormGroup;
  protected user$!: Observable<User>;

  @ViewChild('formPicture') formPicture!: ElementRef;
  @ViewChild('svgContainer') svgContainer!: ElementRef;

  // @Input({required: true})modalClose: BehaviorSubject<Boolean>;

  ngOnInit() {
    this.user$ = this.userService.getUserDataFromFirebase();

    this.profilePictureForm = this.formBuilder.group({
      newPicture: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    console.log('toto');
    const domFormPicture = this.formPicture.nativeElement as HTMLElement;
    const domSvgContainer = this.svgContainer.nativeElement as HTMLElement;

    domFormPicture.style.display = 'none';
    domSvgContainer.style.backdropFilter = 'none';
  }

  get newPicture() {
    return this.profilePictureForm.get('newPicture');
  }

  set newPicture(text) {
    this.profilePictureForm.setValue({ newPicture: text });
  }

  displayForm() {
    const domFormPicture = this.formPicture.nativeElement as HTMLElement;
    const domSvgContainer = this.svgContainer.nativeElement as HTMLElement;

    domFormPicture.style.display = 'flex';
    domSvgContainer.style.backdropFilter = 'grayscale(100%)';
  }

  submit() {
    if (!!this.newPicture) {
      this.userService.setURLImage(this.newPicture.value);

      const domFormPicture = this.formPicture.nativeElement as HTMLElement;
      const domSvgContainer = this.svgContainer.nativeElement as HTMLElement;

      domFormPicture.style.display = 'none';
      domSvgContainer.style.backdropFilter = 'none';
      this.newPicture = '' as any;
    }
  }
}
