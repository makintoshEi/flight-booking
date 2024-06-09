import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services';
import { FlightBookingService } from '../../services/flight-booking.service';
import { QueryService } from '../../services/query/query.service';

@Component({
  selector: 'app-passenger-info',
  standalone: true,
  imports: [],
  templateUrl: './passenger-info.component.html',
  styleUrl: './passenger-info.component.scss'
})
export class PassengerInfoComponent implements OnInit {

  passengersNumber = 1

  constructor(
    private fbService: FlightBookingService,
    private navigationService: NavigationService,
    private queryService: QueryService
  ) { }

  ngOnInit() {
    this.passengersNumber = +this.fbService.flightBookingForm.passengersNumber;
  }

}
