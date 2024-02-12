export class NewBooking {
    constructor(
        public restaurantId: string,
        public date: string,
        public time: string,
        public numberOfGuests: string,
        public customer: {
            name: string,
            lastname: string,
            email: string,
            phone: string
        }
    ) { }
}

