export class NewCustomer {
    constructor (
        public name: string,
        public lastname: string,
        public email: string,
        public phone: string
    ) {}
};

export interface CustomerResponse {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
}

export interface ICreateCustomerResponse {
    customerID: string
}

export class ExisitingCustomer {
    constructor (
        public _id: string,
        public name: string,
        public lastname: string,
        public email: string,
        public phone: string
    ) {}
};

export interface EditCustomer {
    id: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
}