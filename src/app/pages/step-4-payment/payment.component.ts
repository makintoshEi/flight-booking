import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlightBookingService } from '../../services/flight-booking.service';
import { QueryService } from '../../services/query/query.service';
import { FlightBookingType, FlightConfirmationResponse } from '../../types/flight-booking.type';
import { FlightResumeComponent } from './flight-resume/flight-resume.component';
import { FlightBookingAPI, FlightsBookingRoute } from '../../app.constants';
import { NavigationService } from '../../services';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CurrencyPipe, FlightResumeComponent, MatIconModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  flightData!: FlightBookingType;
  totalAmount = 0

  constructor(
    protected fbService: FlightBookingService,
    private navigateService: NavigationService,
    private queryService: QueryService
  ) { }

  ngOnInit() {
    this.flightData = this.fbService.flightBookingForm;
    console.log(':: flight data :: ', this.flightData)
    this.flightCheck()
  }

  flightCheck() {
    this.queryService.post<FlightConfirmationResponse>(FlightBookingAPI.flightConfirmation, this.flightData)
      .subscribe({
        next: (response) => {
          this.totalAmount = response.totalAmount;
        }
      })
  }

  doPayment() {
    this.fbService.resetContext();
    this.navigateService.navigateToLocal(FlightsBookingRoute.StepOne);
  }
}
