import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @Input('columns')
  set columns(value: Record<string, number> | undefined) {
    if (!value) {
      return;
    }

    for (const [breakpoint, space] of Object.entries(value)) {
      this.el.nativeElement.dataset[breakpoint] = space;
    }
  }

  constructor(private el: ElementRef) {
  }
}
