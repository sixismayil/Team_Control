import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationReasonsComponent } from './vacation-reasons.component';

describe('VacationReasonsComponent', () => {
  let component: VacationReasonsComponent;
  let fixture: ComponentFixture<VacationReasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacationReasonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
