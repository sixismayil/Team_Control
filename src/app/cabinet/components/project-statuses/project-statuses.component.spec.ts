import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStatusesComponent } from './project-statuses.component';

describe('ProjectStatusesComponent', () => {
  let component: ProjectStatusesComponent;
  let fixture: ComponentFixture<ProjectStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStatusesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
