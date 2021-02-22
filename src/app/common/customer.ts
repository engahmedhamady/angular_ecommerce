import { Order } from "./order";

export class Customer {
    customerId:number;
    fname:string;
    lname:string;
    email:string;
    orderses : Set<Order>;
    
}
