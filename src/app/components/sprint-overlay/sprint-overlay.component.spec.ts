import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintOverlayComponent } from './sprint-overlay.component';

describe('SprintOverlayComponent', () => {
  let component: SprintOverlayComponent;
  let fixture: ComponentFixture<SprintOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SprintOverlayComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
