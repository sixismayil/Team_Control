import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVacationReasonComponent } from './add-vacation-reason.component';

describe('AddVacationReasonComponent', () => {
  let component: AddVacationReasonComponent;
  let fixture: ComponentFixture<AddVacationReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVacationReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVacationReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
