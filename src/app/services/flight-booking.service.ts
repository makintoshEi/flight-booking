import { Injectable } from "@angular/core";
import { FlightBookingType, FlightInfoType } from "../types/flight-booking.type";

@Injectable({
    providedIn: 'root'
})
export class FlightBookingService {
    flightBookingForm: Partial<FlightBookingType> = this.getCleanContext()

    resetContext() {
        this.flightBookingForm = this.getCleanContext()
    }

    getCleanContext(): FlightBookingType {
        return {
            departDay: null,
            destiny: '',
            departFlightInfo: this.getCleanFlightInfoContext(),
            origin: '',
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
}
