import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectStatusComponent } from './add-project-status.component';

describe('AddProjectStatusComponent', () => {
  let component: AddProjectStatusComponent;
  let fixture: ComponentFixture<AddProjectStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
