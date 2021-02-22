import { BillingAddress } from "./billing-address";
import { Customer } from "./customer";
import { OrderItems } from "./order-items";
import { ShipperAddress } from "./shipper-address";

export class Order {
    orderId:number;
    billingAddress:BillingAddress;
    customer:Customer;
    shipperAddress:ShipperAddress;
    orderTrackingNumber:string;
    totalQuantity:number;
    totalPrice:number;
    status:string;
    dateCreated:Date;
    lastUpdate:Date;
    orderItems:OrderItems[];
    
   
  
}
