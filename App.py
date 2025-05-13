from carService import get_all_cars, get_car_by_id, rent_car

def show_car_list():
    print("Available cars:")
    for car in get_all_cars():
        if car.is_available:
            print(f"{car.car_id} - {car.model}, {car.seats} seats, {car.price_per_day}ar/day")

def prompt_user_rental():
    car_id = int(input("Choose a car by entering its ID: "))
    selected_car = get_car_by_id(car_id)
    
    if not selected_car or not selected_car.is_available:
        print("ATTENTION: Invalid or unavailable car selection.")
        show_car_list()
        return prompt_user_rental()
    
    print(f"You chose the {selected_car.model}.")
    
    days = 0
    is_valid_input = False
    
    while not is_valid_input:
        days_input = input("For how many day(s) would you like to rent the car? ")
        try:
            days = int(days_input)
            if days <= 0 or days_input.strip() == "":
                print("Please enter a valid number of days (must be a positive number).")
            elif days > 30:
                print("For rentals longer than 30 days, please contact our office directly.")
            else:
                is_valid_input = True
        except ValueError:
            print("Please enter a valid number of days (must be a positive number).")
    
    total_price = days * selected_car.price_per_day
    
    print(f"Total price for {days} day(s): {total_price} ar.")
    
    is_valid_confirmation = False
    confirm = ""
    
    while not is_valid_confirmation:
        confirm = input("Do you want to proceed into payment? yes / no: ").lower().strip()
        
        if confirm == "yes" or confirm == "no":
            is_valid_confirmation = True
        else:
            print("Please enter either 'yes' or 'no'.")
    
    if confirm != "yes":
        print("Rental cancelled.")
        return
    
    print("Enter your name (Make sure you enter your correct name):")
    name = input("> ")
    
    payment = 0
    is_valid_payment = False
    
    while not is_valid_payment:
        print(f"Enter the amount to pay ({total_price})ar:")
        try:
            payment = int(input("> "))
            
            if payment <= 0:
                print("Please enter a valid amount.")
            elif payment != total_price:
                print(f"Incorrect payment. Correct payment {total_price}, but you entered {payment}.")
                
                try_again = input("Would you like to try again? yes / no: ").lower().strip()
                if try_again != "yes":
                    print("Rental cancelled.")
                    return
            else:
                is_valid_payment = True
        except ValueError:
            print("Please enter a valid amount.")
    
    result = rent_car(car_id, name, days, payment)
    print(result["message"])

if __name__ == "__main__":
    show_car_list()
    prompt_user_rental()