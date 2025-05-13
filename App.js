"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const carService_js_1 = require("./carService.js");
const prompt = (0, prompt_sync_1.default)();
const showCarList = () => {
    console.log("Available cars:");
    (0, carService_js_1.getAllCars)().forEach((car) => {
        if (car.isAvailable) {
            console.log(`${car.carId} - ${car.model}, ${car.seats} seats, ${car.pricePerDay}ar/day`);
        }
    });
};
const promptUserRental = () => {
    const carId = parseInt(prompt("Choose a car by entering its ID: "));
    const selectedCar = (0, carService_js_1.getCarById)(carId);
    if (!selectedCar || !selectedCar.isAvailable) {
        console.log("ATTENTION: Invalid or unavailable car selection.");
        showCarList();
        return promptUserRental();
    }
    console.log(`You chose the ${selectedCar.model}.`);
    let days = 0;
    let isValidInput = false;
    while (!isValidInput) {
        const daysInput = prompt("For how many day(s) would you like to rent the car? ");
        days = parseInt(daysInput);
        if (isNaN(days) || days <= 0 || daysInput.trim() === "") {
            console.log("Please enter a valid number of days (must be a positive number).");
        }
        else if (days > 30) {
            console.log("For rentals longer than 30 days, please contact our office directly.");
        }
        else {
            isValidInput = true;
        }
    }
    const totalPrice = days * selectedCar.pricePerDay;
    console.log(`Total price for ${days} day(s): ${totalPrice} ar.`);
    let isValidConfirmation = false;
    let confirm = "";
    while (!isValidConfirmation) {
        confirm = prompt(`Do you want to proceed into payment? yes / no: `)
            .toLowerCase()
            .trim();
        if (confirm === "yes" || confirm === "no") {
            isValidConfirmation = true;
        }
        else {
            console.log("Please enter either 'yes' or 'no'.");
        }
    }
    if (confirm !== "yes") {
        console.log("Rental cancelled.");
        return;
    }
    console.log("Enter your name (Make sure you enter your correct name):");
    const name = prompt("> ");
    let payment = 0;
    let isValidPayment = false;
    while (!isValidPayment) {
        console.log(`Enter the amount to pay (${totalPrice})ar:`);
        payment = parseInt(prompt("> "));
        if (isNaN(payment) || payment <= 0) {
            console.log("Please enter a valid amount.");
        }
        else if (payment !== totalPrice) {
            console.log(`Incorrect payment. Correct payment ${totalPrice}, but you entered ${payment}.`);
            const tryAgain = prompt("Would you like to try again? yes / no: ")
                .toLowerCase()
                .trim();
            if (tryAgain !== "yes") {
                console.log("Rental cancelled.");
                return;
            }
        }
        else {
            isValidPayment = true;
        }
    }
    const result = (0, carService_js_1.rentCar)(carId, name, days, payment);
    console.log(result.message);
};
showCarList();
promptUserRental();
