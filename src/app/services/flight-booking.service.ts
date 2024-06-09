import { Injectable } from "@angular/core";
import { CountryType, FlightBookingType, FlightInfoType } from "../types/flight-booking.type";

@Injectable({
    providedIn: 'root'
})
export class FlightBookingService {
    flightBookingForm: FlightBookingType = this._getCleanContext()

    resetContext() {
        this.flightBookingForm = this._getCleanContext()
    }

    private _getCleanContext(): FlightBookingType {
        return {
            departDay: null,
            destiny: this._getCleanCountryContext(),
            departFlightInfo: this._getCleanFlightInfoContext(),
            origin: this._getCleanCountryContext(),
            passengersNumber: '0',
            passengers: [],
            principal: {
                email: '',
                phoneNumber: ''
            },
            returnDate: null,
            returnFlightInfo: this._getCleanFlightInfoContext(),
            tripWay: 'roundtrip'
        }
    }

    private _getCleanFlightInfoContext(): FlightInfoType {
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

    private _getCleanCountryContext(): CountryType {
        return {
            key: '',
            value: ''
        }
    }
}
