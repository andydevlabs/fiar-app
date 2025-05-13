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
    getAllCars().forEach(car => {
        if (car.isAvailable) {
            console.log(
                `${car.carId} - ${car.model}, ${car.seats} seats, ${car.pricePerDay}ar/day`
            );
        }
    });
}

const promptUserRental = () => {
    const carId = parseInt(prompt("Choose a car by entering its ID: "));
    const selectedCar = getCarById(carId);

    if (!selectedCar || !selectedCar.isAvailable) {
        console.log("Invalid or unavailable car selection.");
        showCarList();
        return promptUserRental();
    }

    console.log(`You chose the ${selectedCar.model}.`);

    const days = parseInt(
        prompt("For how many day(s) would you like to rent the car? ")
    );
    const totalPrice = days * selectedCar.pricePerDay;

    console.log(`Total price for ${days} day(s): ${totalPrice} ar.`);

    const confirm = prompt(`Do you want to proceed? yes / no: `).toLowerCase();
    if (confirm !== "yes") {
        console.log("Rental cancelled.");
        return;
    }

    const name = prompt("Enter your name: ");
    const payment = parseInt(prompt("Enter the amount to pay: "));

    const result = rentCar(carId, name, days, payment);
    console.log(result.message);
};

showCarList();
promptUserRental();