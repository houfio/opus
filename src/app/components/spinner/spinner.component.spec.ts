import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    component.message = 'testing';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a spinner', () => {
    expect(fixture.nativeElement.querySelector('.spinner')).toBeTruthy();
  });

  it('should have the correct message', () => {
    expect(fixture.nativeElement.querySelector('.message').innerText).toBe('testing');
  });
});
