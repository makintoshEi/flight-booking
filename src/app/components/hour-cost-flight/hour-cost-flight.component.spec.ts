import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourCostFlightComponent } from './hour-cost-flight.component';

describe('HourCostFlightComponent', () => {
  let component: HourCostFlightComponent;
  let fixture: ComponentFixture<HourCostFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourCostFlightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HourCostFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
