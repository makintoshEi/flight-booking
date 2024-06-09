import { Injectable } from "@angular/core";
import { FlightBookingType } from "../types/flight-booking.type";
import { BehaviorSubject, Subject } from "rxjs";

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
            destiny: '',
            origin: '',
            passengersNumber: '0',
            returnDate: null,
            tripWay: 'roundtrip',
            withLuggage: false
        }
    }
}
