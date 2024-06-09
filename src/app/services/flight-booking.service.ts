import { Injectable } from "@angular/core";
import { CountryType, FlightBookingType, FlightInfoType } from "../types/flight-booking.type";

@Injectable({
    providedIn: 'root'
})
export class FlightBookingService {
    flightBookingForm: FlightBookingType = this.getCleanContext()

    resetContext() {
        this.flightBookingForm = this.getCleanContext()
    }

    getCleanContext(): FlightBookingType {
        return {
            departDay: null,
            destiny: this.getCleanCountryContext(),
            departFlightInfo: this.getCleanFlightInfoContext(),
            origin: this.getCleanCountryContext(),
            passengersNumber: '0',
            returnDate: null,
            returnFlightInfo: this.getCleanFlightInfoContext(),
            tripWay: 'roundtrip',
            withLuggage: false
        }
    }

    getCleanFlightInfoContext(): FlightInfoType {
        return {
            arrivedHour: '',
            destinyIata: '',
            durationTime: '',
            flightCost: '',
            id: '',
            operator: '',
            originIata: '',
            takeOffHour: '',
        }
    }

    getCleanCountryContext(): CountryType {
        return {
            key: '',
            value: ''
        }
    }
}
