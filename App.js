import PromptSync from "prompt-sync";
import { getAllCars, getCarById, rentCar } from "./carService.js";

const prompt = PromptSync();

// const listOfCar = [
//     new Car(1, "mercedes", 5, 150000, true),
//     new Car(2, "Mitsubishi", 5, 120000, true),
//     new Car(3, "Mazda", 9, 130000, true),
//     new Car(4, "Kia", 5, 100000, true),
// ];

// console.log("Available cars:");
// listOfCar.forEach((car) => {
//     console.log(
//         `${car.carId} - ${car.model}, ${car.seats} seats, ${car.pricePerDay} ar per day`
//     );
// });

// const input = parseInt(prompt("Choose a car by entering its ID: "));

// const selectedCar = listOfCar.find((car) => car.carId === input);

// if (!selectedCar) {
//     console.log("Invalid car selection. Please try again.");
//     process.exit(1);
// }

// console.log(`You chose the ${selectedCar.model}`);

// const rentalDurationPrompt = parseInt(
//     prompt("For how many day(s) would you like to rent the car? ")
// );

// const totalRentalPrice = rentalDurationPrompt * selectedCar.pricePerDay;
// console.log(
//     `For ${rentalDurationPrompt} day(s), that will be ${totalRentalPrice}`
// );

// const askForConfirmation = prompt(
//     `You want to rent ${selectedCar.model} for ${totalRentalPrice}ar? yes / no: `
// ).toLowerCase();

// if (askForConfirmation === "yes") {
//     const askForName = prompt(`Please, enter your name: `);
//     const askForPrice = parseInt(prompt(`Please, enter the amount to pay: `));

//     if (askForPrice !== totalRentalPrice) {
//         console.log(
//             `That is not the right amount, it should be ${totalRentalPrice}`
//         );
//     } else {
//         console.log(
//             `Thank you ${askForName} for your payment of ${askForPrice}, you can collect your car right away from our location`
//         );
//     }
// } else if (askForConfirmation === "no") {
//     console.log("Rental cancelled. Thank you for considering our service.");
// } else {
//     console.log(
//         "Invalid response. Please run the program again and enter 'yes' or 'no'."
//     );
// }

const showCarList = () => {
    console.log("Available cars:");
    getAllCars().forEach((car) => {
        if (car.isAvailable) {
            console.log(
                `${car.carId} - ${car.model}, ${car.seats} seats, ${car.pricePerDay}ar/day`
            );
        }
    });
};

const promptUserRental = () => {
    const carId = parseInt(prompt("Choose a car by entering its ID: "));
    const selectedCar = getCarById(carId);

    if (!selectedCar || !selectedCar.isAvailable) {
        console.log("ATTENTION: Invalid or unavailable car selection.");
        showCarList();
        return promptUserRental();
    }

    console.log(`You chose the ${selectedCar.model}.`);

    let days;
    let isValidInput = false;

    while (!isValidInput) {
        const daysInput = prompt(
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

    const totalPrice = days * selectedCar.pricePerDay;

    console.log(`Total price for ${days} day(s): ${totalPrice} ar.`);

    let isValidConfirmation = false;
    let confirm;

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
    const name = prompt("> ");

    let payment;
    let isValidPayment = false;

    while (!isValidPayment) {
        console.log(`Enter the amount to pay (${totalPrice})ar:`);
        payment = parseInt(prompt("> "));

        if (isNaN(payment) || payment <= 0) {
            console.log("Please enter a valid amount.");
        } else if (payment !== totalPrice) {
            console.log(
                `Incorrect payment. Correct payment ${totalPrice}, but you entered ${payment}.`
            );

            const tryAgain = prompt("Would you like to try again? yes / no: ")
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

    const result = rentCar(carId, name, days, payment);
    console.log(result.message);
};

showCarList();
promptUserRental();
