import PromptSync from "prompt-sync";
import { getAllCars, getCarById, rentCar } from "./carService.js";
import Car from "./Car.js";

const prompt: PromptSync.Prompt = PromptSync();


interface RentalResult {
    success: boolean;
    message: string;
}

const showCarList = (): void => {
    console.log("Available cars:");
    getAllCars().forEach((car: Car) => {
        if (car.isAvailable) {
            console.log(
                `${car.carId} - ${car.model}, ${car.seats} seats, ${car.pricePerDay}ar/day`
            );
        }
    });
};

const promptUserRental = (): void => {
    const carId: number = parseInt(prompt("Choose a car by entering its ID: "));
    const selectedCar: Car | undefined = getCarById(carId);

    if (!selectedCar || !selectedCar.isAvailable) {
        console.log("ATTENTION: Invalid or unavailable car selection.");
        showCarList();
        return promptUserRental();
    }

    console.log(`You chose the ${selectedCar.model}.`);

    let days: number = 0;
    let isValidInput: boolean = false;

    while (!isValidInput) {
        const daysInput: string = prompt(
            "For how many day(s) would you like to rent the car? "
        );
        days = parseInt(daysInput);

        if (isNaN(days) || days <= 0 || daysInput.trim() === "") {
            console.log(
                "Please enter a valid number of days (must be a positive number)."
            );
        } else if (days > 30) {
            console.log(
                "For rentals longer than 30 days, please contact our office directly."
            );
        } else {
            isValidInput = true;
        }
    }

    const totalPrice: number = days * selectedCar.pricePerDay;

    console.log(`Total price for ${days} day(s): ${totalPrice} ar.`);

    let isValidConfirmation: boolean = false;
    let confirm: string = "";

    while (!isValidConfirmation) {
        confirm = prompt(`Do you want to proceed into payment? yes / no: `)
            .toLowerCase()
            .trim();

        if (confirm === "yes" || confirm === "no") {
            isValidConfirmation = true;
        } else {
            console.log("Please enter either 'yes' or 'no'.");
        }
    }

    if (confirm !== "yes") {
        console.log("Rental cancelled.");
        return;
    }

    console.log("Enter your name (Make sure you enter your correct name):");
    const name: string = prompt("> ");

    let payment: number = 0;
    let isValidPayment: boolean = false;

    while (!isValidPayment) {
        console.log(`Enter the amount to pay (${totalPrice})ar:`);
        payment = parseInt(prompt("> "));

        if (isNaN(payment) || payment <= 0) {
            console.log("Please enter a valid amount.");
        } else if (payment !== totalPrice) {
            console.log(
                `Incorrect payment. Correct payment ${totalPrice}, but you entered ${payment}.`
            );

            const tryAgain: string = prompt(
                "Would you like to try again? yes / no: "
            )
                .toLowerCase()
                .trim();
            if (tryAgain !== "yes") {
                console.log("Rental cancelled.");
                return;
            }
        } else {
            isValidPayment = true;
        }
    }

    const result: RentalResult = rentCar(carId, name, days, payment);
    console.log(result.message);
};


showCarList();
promptUserRental();
