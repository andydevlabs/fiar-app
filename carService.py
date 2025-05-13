from Car import Car

car_list = [
    Car(1, "Mercedes", 5, 150000, True),
    Car(2, "Mitsubishi", 5, 120000, True),
    Car(3, "Mazda", 9, 130000, True),
    Car(4, "Kia", 5, 100000, True),
]

def get_all_cars():
    return car_list

def get_car_by_id(car_id):
    for car in car_list:
        if car.car_id == car_id:
            return car
    return None

def set_car_availability(car_id, availability):
    car = get_car_by_id(car_id)
    if car:
        car.is_available = availability

def rent_car(car_id, renter_name, duration, payment):
    car = get_car_by_id(car_id)
    
    if not car or not car.is_available:
        return {
            "success": False,
            "message": "Car is not available or doesn't exist."
        }
    
    total_price = car.price_per_day * duration
    
    if payment != total_price:
        return {
            "success": False,
            "message": f"Incorrect payment. Correct payment {total_price}, but you entered {payment}."
        }
    
    set_car_availability(car_id, False)
    
    return {
        "success": True,
        "message": f"Thank you {renter_name} for your payment of {payment}ar. You can pick your {car.model} now."
    }