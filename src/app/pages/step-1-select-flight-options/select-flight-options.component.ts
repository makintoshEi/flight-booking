import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper'
import { provideNativeDateAdapter } from '@angular/material/core';
import { Observable, map, startWith } from 'rxjs';
import { SFCONSTANT } from './select-flight-options.constants';
import { CountryType } from '../../types/flight-booking.type';
import { TripWay } from '../../types/flight-booking.type'
import { NavigationService } from '../../services';
import { FlightBookingAPI, FlightsBookingRoute } from '../../app.constants';
import { FlightBookingService } from '../../services/flight-booking.service';
import { QueryService } from '../../services/query/query.service';

@Component({
  selector: 'app-select-flight-options',
  standalone: true,
  imports: [
    AsyncPipe,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './select-flight-options.component.html',
  styleUrl: './select-flight-options.component.scss'
})
export class SelectFlightOptionsComponent implements OnInit {

  formControlNames = SFCONSTANT.FORM
  selectFlightForm!: FormGroup;
  originCities: CountryType[] = []
  destinyCities: CountryType[] = []
  filteredOriginOptions!: Observable<CountryType[]> | undefined;
  filteredDestinyOptions!: Observable<CountryType[]> | undefined;
  tripWaySelected: TripWay = 'roundtrip'
  today = new Date()
  withLuggage = false

  constructor(
    private navigationService: NavigationService,
    private flightBookingService: FlightBookingService,
    private queryService: QueryService) { }

  ngOnInit() {
    this.buildForm()
    this.getCitiesAndAirports()
  }

  buildForm() {
    this.selectFlightForm = new FormGroup({
      [this.formControlNames.tripWay]: new FormControl(this.tripWaySelected, Validators.required),
      [this.formControlNames.origin]: new FormControl(null, Validators.required),
      [this.formControlNames.destiny]: new FormControl(null, Validators.required),
      [this.formControlNames.departDate]: new FormControl(null, Validators.required),
      [this.formControlNames.returnDate]: new FormControl(null, Validators.required),
      [this.formControlNames.passengersNumber]: new FormControl(1, [Validators.required, Validators.min(1)])
    })
    this.selectFlightForm.get(this.formControlNames.tripWay)?.valueChanges.subscribe({
      next: (tripWay: TripWay) => {
        if (tripWay === 'roundtrip') {
          this.selectFlightForm.addControl(this.formControlNames.returnDate, new FormControl('', Validators.required))
        } else {
          this.selectFlightForm?.removeControl(this.formControlNames.returnDate)
        }
      }
    })

    this.selectFlightForm.get(this.formControlNames.origin)?.valueChanges
      .subscribe({
        next: (value: CountryType) => {
          this.selectFlightForm.get(this.formControlNames.destiny)?.setValue(null)
          let copyDestinyCities = [...this.destinyCities]
          copyDestinyCities = [...copyDestinyCities.filter(city => city.key !== value.key)]
          this.optionsFilter(this.originCities, copyDestinyCities)
        }
      })
  }

  getCitiesAndAirports() {
    this.queryService.get<CountryType[]>(FlightBookingAPI.cityAndAirport)
      .subscribe({
        next: (response) => {
          this.originCities = [...response]
          this.destinyCities = [...response]
          this.optionsFilter(this.originCities, this.destinyCities)
        },
        error: (err) => {
          console.error(err)
        }
      })
  }

  optionsFilter(originCities: CountryType[], destinyCities: CountryType[]) {
    this.filteredOriginOptions = this.selectFlightForm.get(this.formControlNames.origin)
      ?.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '', originCities)),
      );
    this.filteredDestinyOptions = this.selectFlightForm.get(this.formControlNames.destiny)
      ?.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '', destinyCities)),
      );
  }

  private _filter(value: string, options: CountryType[]): CountryType[] {
    if (typeof value === 'string') {
      return options.filter(option => option.value.toLowerCase().includes(value.toLowerCase()))
    }
    return []
  }

  private _getFormValues(controlName: string): any {
    return this.selectFlightForm.get(controlName)?.value
  }

  displayFn(option: CountryType): string {
    return option ? `${option.value}, ${option.key}` : ''
  }

  next() {
    this.flightBookingService.flightBookingForm = {
      departDate: this._getFormValues(this.formControlNames.departDate),
      destiny: this._getFormValues(this.formControlNames.destiny),
      origin: this._getFormValues(this.formControlNames.origin),
      passengersNumber: this._getFormValues(this.formControlNames.passengersNumber),
      returnDate: this._getFormValues(this.formControlNames.returnDate),
      tripWay: this._getFormValues(this.formControlNames.tripWay)
    }
    this.navigationService.navigateToLocal(FlightsBookingRoute.StepTwo)
  }
}
