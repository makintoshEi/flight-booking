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

export {
    FlightBookingType, TripWay
}
