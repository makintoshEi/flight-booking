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
    passengers?: PassengerType[];
    principal?: PrincipalType;
    returnDate: Date | null;
    tripWay: TripWay;
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

type PassengerType = {
    birthDate: string;
    gender: 'O' | 'M' | 'F';
    lastname: string;
    nacionality: string;
    name: string;
    withLuggage: boolean;
}

type PrincipalType = {
    email: string;
    phoneNumber: string;
}

type FlightSearchResponse = {
    flights: FlightInfoType[]
}

export {
    CountryType, FlightBookingType, FlightInfoType,
    FlightSearchResponse, PassengerType, TripWay
}
