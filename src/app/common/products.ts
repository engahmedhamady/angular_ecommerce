import { Category } from "./category";
import { OrderItems } from "./order-items";

export class Products {
    productId :number;
    category: Category;
    
    sku: string;
    name: string;
    description: string;
    unitPrice: number;
    active: boolean;
    unitInStock: number;
    createDate: Date;
    imageUrl:string;
   // orderitemses : Set<OrderItems>;
  
}
