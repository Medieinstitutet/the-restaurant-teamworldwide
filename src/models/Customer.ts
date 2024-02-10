export class NewCustomer {
    constructor (
        public name: string,
        public lastname: string,
        public email: string,
        public phone: string
    ) {}
};

export interface Customer {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    id: number
}
