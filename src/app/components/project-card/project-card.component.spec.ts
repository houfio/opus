import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { UserModel } from '../../models/user.model';

import { ProjectCardComponent } from './project-card.component';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;
  let testUser: IdentifiableModel<UserModel>;
  let testProject: IdentifiableModel<ProjectModel>;
  let projectButton: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    testUser = {
      id: 'userId',
      name: 'Test',
      role: 'Owner'
    };
    
    testProject = {
      id: 'projectId',
      name: 'Test',
      description: 'Test project',
      owner: 'userId',
      archived: false,
      currentSprint: '',
      users: ['userId']
    };

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    component.project = testProject;
    component.owner = testUser;
    component.text = 'Text ding';
    component.archived = false;
    spyOn(component.press, 'emit');
    component.press.subscribe(data => data);

    fixture.detectChanges();

    projectButton = fixture.nativeElement.querySelector('.card');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have data', () => {
    expect(component.project).toBeTruthy();
  });

  it('should emit on click', () => {
    projectButton.dispatchEvent(new Event('click'));
    expect(component.press.emit).toHaveBeenCalled();
  });

  it('should be a button if there are listeners', () => {
    expect(component.isButton).toBeTruthy();
    expect(projectButton).toBeInstanceOf(HTMLButtonElement);
  });

  it('should be an anchor if there are no listeners', () => {
    component.press.unsubscribe();

    fixture.detectChanges();

    projectButton = fixture.nativeElement.querySelector('.card');
    expect(component.isButton).toBeFalsy();
    expect(projectButton).toBeInstanceOf(HTMLAnchorElement);
  });
});
