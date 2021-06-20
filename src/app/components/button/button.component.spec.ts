import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be an anchor if there are routes', () => {
    component.route = ['test'];

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('a')).toBeTruthy();
  });

  it('should be a button if there are no routes', () => {
    expect(fixture.nativeElement.querySelector('button')).toBeTruthy();
  });
});
