import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { FlightBookingService } from '../../services/flight-booking.service';
import { ResumeComponent } from './resume/resume.component'
import { QueryService } from '../../services/query/query.service';
import { NavigationService } from '../../services';
import { FlightBookingType, FlightConfirmationResponse } from '../../types/flight-booking.type';
import { FlightBookingAPI, FlightsBookingRoute } from '../../app.constants';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ResumeComponent],
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
