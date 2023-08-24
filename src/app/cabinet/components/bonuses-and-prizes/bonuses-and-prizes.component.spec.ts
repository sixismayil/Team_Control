import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusesAndPrizesComponent } from './bonuses-and-prizes.component';

describe('BonusesAndPrizesComponent', () => {
  let component: BonusesAndPrizesComponent;
  let fixture: ComponentFixture<BonusesAndPrizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusesAndPrizesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusesAndPrizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
