import PromptSync from "prompt-sync";
import Car from "./Car.js";

const prompt = PromptSync();

const listOfCar = [
    new Car(1, "mercedes", 5, 150000),
    new Car(2, "Mitsubishi", 5, 120000),
    new Car(3, "Mazda", 9, 130000),
    new Car(4, "Kia", 5, 100000),
];

console.log("Available cars:");
listOfCar.forEach((car) => {
    console.log(
        `${car.carId} - ${car.model}, ${car.seats} seats, ${car.pricePerDay} ar per day`
    );
});

const input = parseInt(prompt("Choose a car by entering its ID: "));

const selectedCar = listOfCar.find((car) => car.carId === input);

if (!selectedCar) {
    console.log("Invalid car selection. Please try again.");
    process.exit(1);
}

console.log(`You chose the ${selectedCar.model}`);

const rentalDurationPrompt = parseInt(
    prompt("For how many day(s) would you like to rent the car? ")
);

const totalRentalPrice = rentalDurationPrompt * selectedCar.pricePerDay;
console.log(
    `For ${rentalDurationPrompt} day(s), that will be ${totalRentalPrice}`
);

const askForConfirmation = prompt(
    `You want to rent ${selectedCar.model} for ${totalRentalPrice}ar? yes / no: `
).toLowerCase();

if (askForConfirmation === "yes") {
    const askForName = prompt(`Please, enter your name: `);
    const askForPrice = parseInt(prompt(`Please, enter the amount to pay: `));

    if (askForPrice !== totalRentalPrice) {
        console.log(
            `That is not the right amount, it should be ${totalRentalPrice}`
        );
    } else {
        console.log(
            `Thank you ${askForName} for your payment of ${askForPrice}, you can collect your car right away from our location`
        );
    }
} else if (askForConfirmation === "no") {
    console.log("Rental cancelled. Thank you for considering our service.");
} else {
    console.log(
        "Invalid response. Please run the program again and enter 'yes' or 'no'."
    );
}
