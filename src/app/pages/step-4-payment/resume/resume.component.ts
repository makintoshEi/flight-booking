import { Component, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlightBookingType } from '../../../types/flight-booking.type';
import { FlightResumeComponent } from '../flight-resume/flight-resume.component';
import { FlightBookingService } from '../../../services/flight-booking.service';

@Component({
  selector: 'fb-resume',
  standalone: true,
  imports: [CurrencyPipe, FlightResumeComponent, MatIconModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  fbService = inject(FlightBookingService)
  flightData = input<FlightBookingType>(this.fbService.getCleanContext())
  totalAmount = input<number>(0)
}
