type TripWay = 'oneway' | 'roundtrip'

type FlightBookingType = {
    departDay: Date | null;
    destiny: string;
    origin: string;
    passengersNumber: string;
    returnDate: Date | null;
    tripWay: TripWay;
    withLuggage: boolean;
}

type FlightInfoType = {
    arrivedHour: string;
    destinyIata: string;
    durationTime: string;
    id: string;
    operator: 'avianca' | 'jetsmart'
    originIata: string;
    takeOffHour: string;
    flightCost: string;
}

export {
    FlightBookingType, FlightInfoType, TripWay
}
