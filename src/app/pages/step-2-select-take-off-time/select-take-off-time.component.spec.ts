import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTakeOffTimeComponent } from './select-take-off-time.component';

describe('SelectTakeOffTimeComponent', () => {
  let component: SelectTakeOffTimeComponent;
  let fixture: ComponentFixture<SelectTakeOffTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectTakeOffTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectTakeOffTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
