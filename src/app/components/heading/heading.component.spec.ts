import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingComponent } from './heading.component';

describe('HeadingComponent', () => {
  let component: HeadingComponent;
  let fixture: ComponentFixture<HeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeadingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadingComponent);
    component = fixture.componentInstance;
    fixture.nativeElement.innerHTML = '<p>Test dom</p>'

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct child content', () => {
    expect(fixture.nativeElement.querySelector('p').innerText).toBe('Test dom');
  });
});
