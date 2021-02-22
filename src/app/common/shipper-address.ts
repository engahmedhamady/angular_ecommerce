import { Order } from "./order";

export class ShipperAddress {
    shipperId:number;
    street:string;
    state:string;
    city:string;
    country:string;
    zipCode:string;
    orderses:Set<Order>;
}

