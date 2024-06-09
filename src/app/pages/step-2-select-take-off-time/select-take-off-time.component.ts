import { Component, OnInit } from '@angular/core';
import { FlightBookingService } from '../../services/flight-booking.service';
import { NavigationService } from '../../services';
import { HourCostFlightComponent } from '../../components/hour-cost-flight/hour-cost-flight.component'
import { FlightInfoType, FlightSearchResponse } from '../../types/flight-booking.type';
import { MatIconModule } from '@angular/material/icon';
import { FlightBookingAPI, FlightsBookingRoute } from '../../app.constants';
import { QueryService } from '../../services/query/query.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-select-take-off-time',
  standalone: true,
  imports: [HourCostFlightComponent, MatIconModule],
  templateUrl: './select-take-off-time.component.html',
  styleUrl: './select-take-off-time.component.scss'
})
export class SelectTakeOffTimeComponent implements OnInit {

  originFlights: FlightInfoType[] = []
  returnFlights: FlightInfoType[] = []
  showReturnSection = false

  constructor(
    private navigateService: NavigationService,
    protected fbService: FlightBookingService,
    private queryService: QueryService) {
  }

  ngOnInit() {
    this.getFlights(this.fbService.flightBookingForm.origin.key, this.fbService.flightBookingForm.destiny.key)
      .subscribe(
        {
          next: (response) => {
            this.originFlights = response.flights;
          },
          error: (err) => {
            console.error(err)
          }
        }
      )
  }

  getFlights(iataOrigin: string, iataDestiny: string) {
    const endpoint = `${FlightBookingAPI.flightSearch}/${iataOrigin}/${iataDestiny}`
    return this.queryService.get<FlightSearchResponse>(endpoint).pipe(tap((data) => data))
  }

  onDepartFlightSelected(flightSelected: FlightInfoType) {
    this.fbService.flightBookingForm.departFlightInfo = flightSelected
    if (this.fbService.flightBookingForm.tripWay === 'roundtrip') {
      this.getFlights(this.fbService.flightBookingForm.destiny.key, this.fbService.flightBookingForm.origin.key)
        .subscribe(
          {
            next: (response) => {
              this.returnFlights = response.flights;
              this.showReturnSection = true
            },
            error: (err) => {
              console.error(err)
            }
          }
        )
      return
    }
    this.next()
  }

  onReturnFlightSelected(flightSelected: FlightInfoType) {
    this.fbService.flightBookingForm.returnFlightInfo = flightSelected
    this.next()
  }

  next() {
    this.navigateService.navigateToLocal(FlightsBookingRoute.StepThree)
  }

}
