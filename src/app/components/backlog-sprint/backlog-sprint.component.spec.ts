import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogSprintComponent } from './backlog-sprint.component';

describe('BacklogSprintComponent', () => {
  let component: BacklogSprintComponent;
  let fixture: ComponentFixture<BacklogSprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BacklogSprintComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
