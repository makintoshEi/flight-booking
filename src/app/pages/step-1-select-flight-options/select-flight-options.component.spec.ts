import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFlightOptionsComponent } from './select-flight-options.component';

describe('SelectFlightOptionsComponent', () => {
  let component: SelectFlightOptionsComponent;
  let fixture: ComponentFixture<SelectFlightOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectFlightOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectFlightOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
