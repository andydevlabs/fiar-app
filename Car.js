"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Car {
    constructor(carId, model, seats, pricePerDay, isAvailable) {
        this.carId = carId;
        this.model = model;
        this.seats = seats;
        this.pricePerDay = pricePerDay;
        this.isAvailable = isAvailable;
    }
}
exports.default = Car;
