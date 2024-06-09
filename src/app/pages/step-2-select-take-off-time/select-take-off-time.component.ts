import { Component, OnInit } from '@angular/core';
import { FlightBookingService } from '../../services/flight-booking.service';
import { NavigationService } from '../../services';

@Component({
  selector: 'app-select-take-off-time',
  standalone: true,
  imports: [],
  templateUrl: './select-take-off-time.component.html',
  styleUrl: './select-take-off-time.component.scss'
})
export class SelectTakeOffTimeComponent {

  constructor(private navigateService: NavigationService,
    private flightBookingService: FlightBookingService) {
  }

}
