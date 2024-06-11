import { Component, input, output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'fb-hour-cost-flight',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, MatIconModule],
  templateUrl: './hour-cost-flight.component.html',
  styleUrl: './hour-cost-flight.component.scss'
})
export class HourCostFlightComponent {

  arrivedHour = input<string>('')
  destinyIata = input<string>('')
  durationTime = input<string>('')
  isSelected = input<boolean>(false)
  operator = input<string>('')
  originIata = input<string>('')
  takeOffHour = input<string>('')
  flightCost = input<string>('')

  selectFlightEvent = output();

  selectFlight() {
    this.selectFlightEvent.emit()
  }

}
