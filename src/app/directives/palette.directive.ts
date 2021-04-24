import { Directive, ElementRef, Input } from '@angular/core';

import { Palette } from '../types';

@Directive({
  selector: '[appPalette]'
})
export class PaletteDirective {
  @Input()
  set appPalette(value: Palette | undefined) {
    if (!value) {
      return;
    }

    const [foreground, background] = value;

    this.el.nativeElement.style.color = `var(--${foreground})`;
    this.el.nativeElement.style.backgroundColor = `var(--${background})`;
  }

  constructor(private el: ElementRef) {
  }
}
