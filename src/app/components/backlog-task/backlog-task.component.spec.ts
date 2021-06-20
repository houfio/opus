import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdentifiableModel } from '../../models/identifiable.model';
import { StateModel } from '../../models/state.model';
import { TaskModel } from '../../models/task.model';

import { BacklogTaskComponent } from './backlog-task.component';

describe('BacklogTaskComponent', () => {
  let component: BacklogTaskComponent;
  let fixture: ComponentFixture<BacklogTaskComponent>;
  let testStates: IdentifiableModel<StateModel>[];
  let testTask: IdentifiableModel<TaskModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BacklogTaskComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    testStates = [
      {
        id: 'todoId',
        name: 'TO DO',
        order: 0
      },
      {
        id: 'progressId',
        name: 'In Progress',
        order: 1
      },
      {
        id: 'doneId',
        name: 'Done',
        order: 2
      }
    ];
    testTask = {
      id: 'taskId',
      title: 'Task title',
      description: 'Task description',
      state: 'todoId',
      points: 4,
      assignee: 'userId',
      sprint: 'sprintId',
      archived: false
    };

    fixture = TestBed.createComponent(BacklogTaskComponent);
    component = fixture.componentInstance;
    component.states = testStates;
    component.task = testTask;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(fixture.nativeElement.querySelector('.title').innerText).toBe('Task title');
  });

  it('should have the correct state', () => {
    expect(fixture.nativeElement.querySelector('.label').innerText).toBe('TO DO');
  });

  it('should have the correct points', () => {
    expect(fixture.nativeElement.querySelector('.points').innerText).toBe('4');
  });
});
