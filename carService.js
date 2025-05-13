import Car from "./Car.js";

const carList = [
    new Car(1, "mercedes", 5, 150000, true),
    new Car(2, "Mitsubishi", 5, 120000, true),
    new Car(3, "Mazda", 9, 130000, true),
    new Car(4, "Kia", 5, 100000, true),
];

export function getAllCars() {
    return carList;
}

export function getCarById(id) {
    return carList.find((car) => car.carId === id);
}


export function setCarAvailability(id, availability) {
    const car = getCarById(id);
    if (car) {
        car.isAvailable = availability;
    }
}