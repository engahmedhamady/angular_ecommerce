import { Products } from "./products";

export class CartItem {
    id: number;
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;
    quantity: number;
    constructor(theProduct: Products) {
        this.id = theProduct.productId;
        this.name = theProduct.name;
        this.unitPrice= theProduct.unitPrice;
        this.imageUrl = theProduct.imageUrl;
        this.quantity = 1;

    }
}
