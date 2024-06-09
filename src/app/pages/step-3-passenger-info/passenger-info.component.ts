import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services';
import { FlightBookingService } from '../../services/flight-booking.service';
import { PersonInfoComponent } from './person-info/person-info.component'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PICONSTANT } from './person-info/person-info.constants';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlightsBookingRoute } from '../../app.constants';

@Component({
  selector: 'app-passenger-info',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, PersonInfoComponent, ReactiveFormsModule],
  templateUrl: './passenger-info.component.html',
  styleUrl: './passenger-info.component.scss'
})
export class PassengerInfoComponent implements OnInit {

  passengerForms: FormGroup[] = []
  principalForm!: FormGroup
  principalEmail = PICONSTANT.FORM.EMAIL
  principalPhoneNumber = PICONSTANT.FORM.PHONENUMBER

  constructor(
    protected fbService: FlightBookingService,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.buildForm()
  }

  private buildForm() {
    this.principalForm = new FormGroup({
      [PICONSTANT.FORM.EMAIL]: new FormControl(null, [Validators.required, Validators.email]),
      [PICONSTANT.FORM.PHONENUMBER]: new FormControl(null, [Validators.required, Validators.pattern(/^(?:[+\d].*\d|\d)$/)]),
    })
    for (let i = 0; i < +this.fbService.flightBookingForm.passengersNumber; i++) {
      this.passengerForms.push(this.getFormGroup())
    }
  }

  get formGroupIsValid() {
    return this.passengerForms.every(form => form.status === 'VALID')
  }

  private getFormGroup(): FormGroup {
    return new FormGroup({
      [PICONSTANT.FORM.BIRTHDATE]: new FormControl(null, Validators.required),
      [PICONSTANT.FORM.GENDER]: new FormControl(null, Validators.required),
      [PICONSTANT.FORM.LASTNAME]: new FormControl(null, Validators.required),
      [PICONSTANT.FORM.LUGGAGE]: new FormControl(false),
      [PICONSTANT.FORM.NACIONALITY]: new FormControl(null, Validators.required),
      [PICONSTANT.FORM.NAME]: new FormControl(null, Validators.required)
    })
  }

  next() {
    if (this.principalForm.status === 'VALID' && this.formGroupIsValid) {
      this.setPassengersData()
      this.navigationService.navigateToLocal(FlightsBookingRoute.StepFour)
    }
  }

  setPassengersData() {
    this.passengerForms.forEach(form => {
      this.fbService.flightBookingForm.passengers?.push({
        birthDate: form.get(PICONSTANT.FORM.BIRTHDATE)?.value,
        gender: form.get(PICONSTANT.FORM.GENDER)?.value,
        lastname: form.get(PICONSTANT.FORM.LASTNAME)?.value,
        nacionality: form.get(PICONSTANT.FORM.NACIONALITY)?.value,
        name: form.get(PICONSTANT.FORM.NAME)?.value,
        withLuggage: form.get(PICONSTANT.FORM.LUGGAGE)?.value,
      })
    })
    this.fbService.flightBookingForm.principal = {
      email: this.principalForm.get(this.principalEmail)?.value,
      phoneNumber: this.principalForm.get(this.principalPhoneNumber)?.value
    }
  }

}
