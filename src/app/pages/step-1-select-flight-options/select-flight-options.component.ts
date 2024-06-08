import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Observable, map, startWith } from 'rxjs';
import { SFCONSTANT } from './select-flight-options.constants';
import { OptionType, TripWay } from './types/select-flight.type';

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
    ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './select-flight-options.component.html',
  styleUrl: './select-flight-options.component.scss'
})
export class SelectFlightOptionsComponent implements OnInit {

  formControlNames = SFCONSTANT.FORM
  selectFlightForm!: FormGroup;
  originOptions = [...SFCONSTANT.OPTIONS]
  destinyOptions = [...SFCONSTANT.OPTIONS]
  filteredOriginOptions!: Observable<OptionType[]> | undefined;
  filteredDestinyOptions!: Observable<OptionType[]> | undefined;
  tripWaySelected: TripWay = 'roundtrip'
  withLuggage = false

  ngOnInit() {
    this.selectFlightForm = new FormGroup({
      [this.formControlNames.tripWay]: new FormControl(this.tripWaySelected, Validators.required),
      [this.formControlNames.origin]: new FormControl(null, Validators.required),
      [this.formControlNames.destiny]: new FormControl(null, Validators.required),
      [this.formControlNames.departDate]: new FormControl(null, Validators.required),
      [this.formControlNames.returnDate]: new FormControl(null, Validators.required),
      [this.formControlNames.passengersNumber]: new FormControl(1, [Validators.required, Validators.min(1)]),
      [this.formControlNames.withLugagge]: new FormControl(false),
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
    this.optionsFilter()
  }


  optionsFilter() {
    this.filteredOriginOptions = this.selectFlightForm.get(this.formControlNames.origin)
      ?.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '', this.originOptions)),
      );
    this.filteredDestinyOptions = this.selectFlightForm.get(this.formControlNames.destiny)
      ?.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '', this.destinyOptions)),
      );
  }

  private _filter(value: string, options: OptionType[]): OptionType[] {
    return options.filter(option => option.value.toLowerCase().includes(value.toLowerCase()))
  }

}
