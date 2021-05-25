import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogTaskComponent } from './backlog-task.component';

describe('BacklogTaskComponent', () => {
  let component: BacklogTaskComponent;
  let fixture: ComponentFixture<BacklogTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BacklogTaskComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
