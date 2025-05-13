class Car {
    carId: number;
    model: string;
    seats: number;
    pricePerDay: number;
    isAvailable: boolean;

    constructor(
        carId: number,
        model: string,
        seats: number,
        pricePerDay: number,
        isAvailable: boolean
    ) {
        this.carId = carId;
        this.model = model;
        this.seats = seats;
        this.pricePerDay = pricePerDay;
        this.isAvailable = isAvailable;
    }
}

export default Car;
