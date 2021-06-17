import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, HostListener, HostBinding, Input } from '@angular/core';

import { IdentifiableModel } from '../../models/identifiable.model';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.25s ease', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('.25s ease', style({ opacity: 0 }))
      ])
    ]),
    trigger('slide', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('.25s ease')
      ]),
      transition(':leave', [
        animate('.25s ease', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class OverlayComponent {
  @Input()
  public task!: IdentifiableModel<TaskModel>;
  @Output()
  public dismiss = new EventEmitter();

  @HostBinding('@fade')
  @HostListener('document:keydown.escape')
  public onEscape() {
    this.dismiss.emit();
  }
}
