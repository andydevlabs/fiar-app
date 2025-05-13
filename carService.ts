import Car from "./Car.js";

interface RentalResult {
    success: boolean;
    message: string;
}

const carList: Car[] = [
    new Car(1, "Mercedes", 5, 150000, true),
    new Car(2, "Mitsubishi", 5, 120000, true),
    new Car(3, "Mazda", 9, 130000, true),
    new Car(4, "Kia", 5, 100000, true),
];

export function getAllCars(): Car[] {
    return carList;
}

export function getCarById(id: number): Car | undefined {
    return carList.find((car) => car.carId === id);
}

export function setCarAvailability(id: number, availability: boolean): void {
    const car = getCarById(id);
    if (car) {
        car.isAvailable = availability;
    }
}

export function rentCar(
    carId: number,
    renterName: string,
    duration: number,
    payment: number
): RentalResult {
    const car = getCarById(carId);

    if (!car || !car.isAvailable) {
        return {
            success: false,
            message: "Car is not available or doesn't exist.",
        };
    }

    const totalPrice = car.pricePerDay * duration;

    if (payment !== totalPrice) {
        return {
            success: false,
            message: `Incorrect payment. Correct payment ${totalPrice}, but you entered ${payment}.`,
        };
    }

    setCarAvailability(carId, false);

    return {
        success: true,
        message: `Thank you ${renterName} for your payment of ${payment}ar. You can pick your ${car.model} now.`,
    };
}
