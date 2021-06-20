import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input()
  public palette?: [string, string];
  @Input()
  public route?: string[];
  @Input()
  public params?: object;
  @Output()
  public press = new EventEmitter<void>();

  public get type() {
    return this.press.observers.length ? 'button' : 'submit';
  }
}
