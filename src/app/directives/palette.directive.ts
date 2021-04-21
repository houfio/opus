import { Directive, ElementRef, Input, OnInit } from '@angular/core';

import { Palette } from '../types';

@Directive({
  selector: '[appPalette]'
})
export class PaletteDirective implements OnInit {
  @Input() appPalette?: Palette;

  constructor(private el: ElementRef) {
  }

  public ngOnInit() {
    if (!this.appPalette) {
      return;
    }

    const [foreground, background] = this.appPalette;

    this.el.nativeElement.style.color = `var(--${foreground})`;
    this.el.nativeElement.style.backgroundColor = `var(--${background})`;
  }
}
