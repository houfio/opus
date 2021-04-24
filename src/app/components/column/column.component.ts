import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @Input()
  public set columns(value: Record<string, number> | undefined) {
    if (!value) {
      return;
    }

    for (const [breakpoint, space] of Object.entries(value)) {
      this.el.nativeElement.dataset[breakpoint] = space;
    }
  }

  public constructor(private el: ElementRef) {
  }
}
