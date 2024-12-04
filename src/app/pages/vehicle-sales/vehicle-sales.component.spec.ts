import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSalesComponent } from './vehicle-sales.component';

describe('VehicleSalesComponent', () => {
  let component: VehicleSalesComponent;
  let fixture: ComponentFixture<VehicleSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
