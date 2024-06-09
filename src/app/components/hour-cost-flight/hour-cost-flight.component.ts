import { Component, input } from '@angular/core';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeEC from '@angular/common/locales/es-EC'
registerLocaleData(localeEC, 'es');

@Component({
  selector: 'app-hour-cost-flight',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './hour-cost-flight.component.html',
  styleUrl: './hour-cost-flight.component.scss'
})
export class HourCostFlightComponent {
  checkInHour = input<string>('')
  destinyIata = input<string>('')
  originIata = input<string>('')
  takeOffHour = input<string>('')
  flightCost = input<string>('')
}
