import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'fb-flight-resume',
  standalone: true,
  imports: [DatePipe, MatIconModule],
  templateUrl: './flight-resume.component.html',
  styleUrl: './flight-resume.component.scss'
})
export class FlightResumeComponent {
  arrivedHour = input<string | undefined>('')
  destiny = input('')
  flightDate = input<Date | null>()
  flightType = input<'Ida' | 'Vuelta'>('Ida')
  origin = input('')
  takeOffHour = input<string | undefined>('')
}
