import { CartItem } from "./cart-item";
import { Products } from "./products";

export class OrderItems {
    imageUrl:string;
    unitPrice:number;
    quantity:number;
    products:Products
    productId:number;
    constructor(cartItem:CartItem){
        this.imageUrl=cartItem.imageUrl;
        this.unitPrice=cartItem.unitPrice;
        this.quantity=cartItem.quantity;
        this.productId=cartItem.id;
    }
}
