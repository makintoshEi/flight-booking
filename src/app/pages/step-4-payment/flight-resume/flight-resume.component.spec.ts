import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightResumeComponent } from './flight-resume.component';

describe('FlightResumeComponent', () => {
  let component: FlightResumeComponent;
  let fixture: ComponentFixture<FlightResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightResumeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
