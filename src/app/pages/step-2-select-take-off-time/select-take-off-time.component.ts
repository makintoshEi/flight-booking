import { Component } from '@angular/core';
import { FlightBookingService } from '../../services/flight-booking.service';
import { NavigationService } from '../../services';
import { HourCostFlightComponent } from '../../components/hour-cost-flight/hour-cost-flight.component'
import { FlightInfoType } from '../../types/flight-booking.type';

@Component({
  selector: 'app-select-take-off-time',
  standalone: true,
  imports: [HourCostFlightComponent],
  templateUrl: './select-take-off-time.component.html',
  styleUrl: './select-take-off-time.component.scss'
})
export class SelectTakeOffTimeComponent {

  hourCostArr: FlightInfoType[] = [
    {
      arrivedHour: '12:30',
      destinyIata: 'AUA',
      durationTime: '4h 35m+',
      id: '1',
      operator: 'avianca',
      originIata: 'UIO',
      takeOffHour: '07:51',
      flightCost: '600'
    },
    {
      arrivedHour: '12:41',
      destinyIata: 'AUA',
      durationTime: '4h 35m+',
      id: '1',
      operator: 'avianca',
      originIata: 'UIO',
      takeOffHour: '08:01',
      flightCost: '300'
    },
    {
      arrivedHour: '14:37',
      destinyIata: 'AUA',
      durationTime: '4h 35m+',
      id: '1',
      operator: 'jetsmart',
      originIata: 'UIO',
      takeOffHour: '10:17',
      flightCost: '310'
    },
    {
      arrivedHour: '18:45',
      destinyIata: 'AUA',
      durationTime: '4h 35m+',
      id: '1',
      operator: 'jetsmart',
      originIata: 'UIO',
      takeOffHour: '14:15',
      flightCost: '400'
    },
    {
      arrivedHour: '21:35',
      destinyIata: 'AUA',
      durationTime: '4h 35m+',
      id: '1',
      operator: 'avianca',
      originIata: 'UIO',
      takeOffHour: '17:00',
      flightCost: '280'
    },
  ]
  constructor(private navigateService: NavigationService,
    private flightBookingService: FlightBookingService) {
  }

  handleFlightSelection(flightSelected: FlightInfoType) {
    console.log('flight selected', flightSelected)
  }

}
