interface Car {
    brand: string;
    model: string;
    registrationNo: string;
    price: number;
    availability: boolean;
    locationId: number;
    dealerId: string;
}
// export Car;

class CarModel implements Car {
    brand: string;
    model: string;
    registrationNo: string;
    price: number;
    availability: boolean;
    locationId: number;
    dealerId: string;
    constructor() {
        this.brand = '';
        this.model = '';
        this.registrationNo = '';
        this.price = 0;
        this.availability = true;
        this.locationId = 0;
        this.dealerId = '';
    }
}
class DriverCarModel extends CarModel{
    customerId: string;
    carId: string;
    source: string;
    destination: string;
    driverId: string;
    startDate: Date;
    endDate: Date;
    constructor(){
        super();
        this.customerId='';
        this.carId='';
        this.source='';
        this.destination='';
        this.driverId='';
    }
}
export {Car, CarModel,DriverCarModel};
