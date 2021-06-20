import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appPalette]'
})
export class PaletteDirective {
  @Input()
  public set appPalette(value: [string, string] | undefined) {
    if (!value) {
      return;
    }

    const [foreground, background] = value;

    this.el.nativeElement.style.color = `var(--${foreground})`;
    this.el.nativeElement.style.backgroundColor = `var(--${background})`;
  }

  public constructor(private el: ElementRef) {
  }
}
