export class NewBooking {
    constructor(
        public restaurantId: string,
        public date: string,
        public time: string,
        public numberOfGuests: number,
        public customer: {
            name: string,
            lastname: string,
            email: string,
            phone: string
        }
    ) { }
}

export interface INewBooking {
    restaurantId: string,
    date: string,
    time: string,
    numberOfGuests: number,
    customer: {
        name: string,
        lastname: string,
        email: string,
        phone: string
    }
}
export interface IReceivedBookings {
    _id: string,
    restaurantId: string,
    date: string,
    time: string,
    numberOfGuests: number;
    customerId: string;

}

export interface IAdminBookings {
    _id: string,
    restaurantId: string,
    date: string,
    time: string,
    numberOfGuests: number;
    customerId: string;
    enableEdit: boolean;
}
export class EditedBooking {
    constructor (
        public _id: string,
        public restaurantId: string,
        public date: string,
        public time: string,
        public numberOfGuests: number,
        public customerId: string
    ) {}
}

export interface IConfirmedBooking {
    acknowledged: boolean,
    insertedId: string
}