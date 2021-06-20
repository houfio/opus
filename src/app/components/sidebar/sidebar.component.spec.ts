import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show settings for members', () => {
    component.owner = false;

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-button').length).toBe(3);
  });

  it('should show settings for project owner', () => {
    component.owner = true;

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-button').length).toBe(4);
  });
});
