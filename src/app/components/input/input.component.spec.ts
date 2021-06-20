import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.name = 'test';
    component.label = 'Input label';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be an instance of input by default', () => {
    expect(fixture.nativeElement.querySelector('#test')).toBeInstanceOf(HTMLInputElement);
  });

  it('should be an NGX-DATEPICKER if the type is date', () => {
    component.type = 'date';

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#test').tagName).toBe('NGX-DATEPICKER');
  });

  it('should have te correct id', () => {
    expect(fixture.nativeElement.querySelector('input').id).toBe('test');
  });

  it('should have te correct label', () => {
    expect(fixture.nativeElement.querySelector('label').innerText).toBe('INPUT LABEL');
  });
});
