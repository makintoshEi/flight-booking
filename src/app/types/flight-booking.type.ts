type CountryType = {
    key: string;
    value: string;
}

type TripWay = 'oneway' | 'roundtrip'

type FlightBookingType = {
    departDay: Date | null;
    destiny: CountryType;
    departFlightInfo?: FlightInfoType;
    returnFlightInfo?: FlightInfoType;
    origin: CountryType;
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
    operator: 'avianca' | 'jetsmart' | ''
    originIata: string;
    takeOffHour: string;
    flightCost: string;
}

type FlightSearchResponse = {
    flights: FlightInfoType[]
}

export {
    CountryType, FlightBookingType, FlightInfoType, FlightSearchResponse, TripWay
}
