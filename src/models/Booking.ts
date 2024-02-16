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
export interface IReceivedBookings {
    _id: string,
    restaurantId: string,
    date: string,
    time: string,
    numberOfGuests: number;
    customerId: string;

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
