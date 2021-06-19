import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor {
  @Input()
  public name!: string;
  @Input()
  public label!: string;
  @Input()
  public type = 'text';
  @Input()
  public minDate?: Date;
  @Input()
  public maxDate?: Date;

  public value = '';
  public onChange: any = () => {
  };
  public onTouch: any = () => {
  };

  public get options() {
    return {
      inputClass: 'input',
      minDate: this.minDate,
      maxDate: this.maxDate
    };
  }

  public writeValue(obj: any) {
    this.value = obj;
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
