import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBonusAndPrizeComponent } from './add-bonus-and-prize.component';

describe('AddBonusAndPrizeComponent', () => {
  let component: AddBonusAndPrizeComponent;
  let fixture: ComponentFixture<AddBonusAndPrizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBonusAndPrizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBonusAndPrizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
