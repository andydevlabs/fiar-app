"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCars = getAllCars;
exports.getCarById = getCarById;
exports.setCarAvailability = setCarAvailability;
exports.rentCar = rentCar;
const Car_js_1 = __importDefault(require("./Car.js"));
const carList = [
    new Car_js_1.default(1, "Mercedes", 5, 150000, true),
    new Car_js_1.default(2, "Mitsubishi", 5, 120000, true),
    new Car_js_1.default(3, "Mazda", 9, 130000, true),
    new Car_js_1.default(4, "Kia", 5, 100000, true),
];
function getAllCars() {
    return carList;
}
function getCarById(id) {
    return carList.find((car) => car.carId === id);
}
function setCarAvailability(id, availability) {
    const car = getCarById(id);
    if (car) {
        car.isAvailable = availability;
    }
}
function rentCar(carId, renterName, duration, payment) {
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
