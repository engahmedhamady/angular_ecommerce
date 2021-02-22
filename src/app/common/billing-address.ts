import { Order } from "./order";

export class BillingAddress {
    billingId:number;
    street:string;
    state:string;
    city:string;
    country:string;
    zipCode:string;
   orderses :Set<Order>;
}
