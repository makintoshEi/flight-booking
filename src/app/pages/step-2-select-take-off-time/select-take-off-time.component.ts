import { Component } from '@angular/core';
import { FlightBookingService } from '../../services/flight-booking.service';
import { NavigationService } from '../../services';
import { HourCostFlightComponent } from '../../components/hour-cost-flight/hour-cost-flight.component'
import { FlightInfoType } from '../../types/flight-booking.type';
import { MatIconModule } from '@angular/material/icon';
import { FlightsBookingRoute } from '../../app.constants';

@Component({
  selector: 'app-select-take-off-time',
  standalone: true,
  imports: [HourCostFlightComponent, MatIconModule],
  templateUrl: './select-take-off-time.component.html',
  styleUrl: './select-take-off-time.component.scss'
})
export class SelectTakeOffTimeComponent {

  fromOriginFlights: FlightInfoType[] = [
    {
      arrivedHour: '12:30',
      destinyIata: 'AUA',
      durationTime: '4h 35m+',
      id: 'abc',
      operator: 'avianca',
      originIata: 'UIO',
      takeOffHour: '07:51',
      flightCost: '600'
    },
    {
      arrivedHour: '12:41',
      destinyIata: 'AUA',
      durationTime: '4h 35m+',
      id: 'def',
      operator: 'avianca',
      originIata: 'UIO',
      takeOffHour: '08:01',
      flightCost: '300'
    },
    {
      arrivedHour: '14:37',
      destinyIata: 'AUA',
      durationTime: '4h 35m+',
      id: 'hij',
      operator: 'jetsmart',
      originIata: 'UIO',
      takeOffHour: '10:17',
      flightCost: '310'
    },
    {
      arrivedHour: '18:45',
      destinyIata: 'AUA',
      durationTime: '4h 35m+',
      id: 'klm',
      operator: 'jetsmart',
      originIata: 'UIO',
      takeOffHour: '14:15',
      flightCost: '400'
    },
    {
      arrivedHour: '21:35',
      destinyIata: 'AUA',
      durationTime: '4h 35m+',
      id: 'opq',
      operator: 'avianca',
      originIata: 'UIO',
      takeOffHour: '17:00',
      flightCost: '280'
    },
  ]

  fromDestinyFlights: FlightInfoType[] = [
    {
      arrivedHour: '12:30',
      destinyIata: 'AUA',
      durationTime: '4h 35m+',
      id: 'abc',
      operator: 'avianca',
      originIata: 'UIO',
      takeOffHour: '07:51',
      flightCost: '600'
    },
    {
      arrivedHour: '12:41',
      destinyIata: 'AUA',
      durationTime: '4h 35m+',
      id: 'def',
      operator: 'avianca',
      originIata: 'UIO',
      takeOffHour: '08:01',
      flightCost: '300'
    },
    {
      arrivedHour: '14:37',
      destinyIata: 'AUA',
      durationTime: '4h 35m+',
      id: 'hij',
      operator: 'jetsmart',
      originIata: 'UIO',
      takeOffHour: '10:17',
      flightCost: '310'
    },
    {
      arrivedHour: '18:45',
      destinyIata: 'AUA',
      durationTime: '4h 35m+',
      id: 'klm',
      operator: 'jetsmart',
      originIata: 'UIO',
      takeOffHour: '14:15',
      flightCost: '400'
    },
    {
      arrivedHour: '21:35',
      destinyIata: 'AUA',
      durationTime: '4h 35m+',
      id: 'opq',
      operator: 'avianca',
      originIata: 'UIO',
      takeOffHour: '17:00',
      flightCost: '280'
    }
  ]

  showReturnSection = false

  constructor(private navigateService: NavigationService,
    protected fbService: FlightBookingService) {
  }

  onDepartFlightSelected(flightSelected: FlightInfoType) {
    this.fbService.flightBookingForm.departFlightInfo = flightSelected
    if (this.fbService.flightBookingForm.tripWay === 'roundtrip') {
      // call API
      setTimeout(() => this.showReturnSection = true, 1000)
    } else {
      this.navigateService.navigateToLocal(FlightsBookingRoute.StepThree)
    }

  }

}
