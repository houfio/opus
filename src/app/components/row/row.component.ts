import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent {
  @Input('spaces')
  set spaces(value: Record<string, number> | undefined) {
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
