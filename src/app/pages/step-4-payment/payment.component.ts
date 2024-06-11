import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FlightBookingService } from '../../services/flight-booking.service';
import { ResumeComponent } from './resume/resume.component'
import { QueryService } from '../../services/query/query.service';
import { NavigationService } from '../../services';
import { FlightBookingResponse, FlightBookingType, FlightConfirmationResponse } from '../../types/flight-booking.type';
import { FlightBookingAPI, FlightsBookingRoute } from '../../app.constants';
import { DialogInformationComponent } from '../../components/dialog-information/dialog-information.component'
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component'
import { ScreeStatusType } from '../../types/screen-status.type';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [LoadingScreenComponent, MatButtonModule, MatIconModule, ResumeComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {

  flightData!: FlightBookingType;
  screenStatus: ScreeStatusType = 'loading'
  screenStatusDescription = 'Cargando...'
  totalAmount = 0

  constructor(
    protected fbService: FlightBookingService,
    private navigateService: NavigationService,
    private queryService: QueryService,
    public dialog: MatDialog
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
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => this.screenStatus = 'normal'
      })
  }

  doPayment() {
    this.screenStatus = 'loading'
    this.screenStatusDescription = 'Conectando con PayPal ...'
    setTimeout(() => {
      this.queryService.post<FlightBookingResponse>(FlightBookingAPI.booking, this.flightData)
        .subscribe({
          next: (response) => {
            if (response.bookingStatus === 'success') {
              const dialogRef = this.dialog.open(DialogInformationComponent, {
                data: {
                  message: response.message,
                }
              });
              dialogRef.afterClosed().subscribe(() => {
                this.fbService.resetContext();
                this.navigateService.navigateToLocal(FlightsBookingRoute.StepOne);
              });
            }
          },
          error: (err) => {
            console.error(err)
          },
          complete: () => this.screenStatus = 'normal'
        })
    }, 4000)
  }
}
