import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  cartItems: CartItem[] = [];
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  totalPrice: Subject<number> =new BehaviorSubject<number>(0);
  constructor() { }
  addToCart(theCartItem: CartItem) {
    let alreadyExist: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      // for (let tempCartItem of this.cartItems) {
      //   if (tempCartItem.id === theCartItem.id) {
      //     existingCartItem = tempCartItem;
      //     break;
      //   }
      // }
      existingCartItem=this.cartItems.find(tempCartItem =>tempCartItem.id===theCartItem.id);
      alreadyExist = (existingCartItem != undefined)

    }
    if (alreadyExist) {
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();
  }
  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;

    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalQuantityValue, totalPriceValue);
  }
  logCartData(totalQuantityValue: number, totalPriceValue: number) {
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
    }

  }
  decrementQuantity(theCartItem: CartItem) {
   theCartItem.quantity--;
   if(theCartItem.quantity===0){
      this.remove(theCartItem);
   }
   else{
     this.computeCartTotals();
   }
  }
  remove(theCartItem: CartItem) {
    const itemIndex =this.cartItems.
    findIndex(tempCartItem =>tempCartItem.id===theCartItem.id);
    if(itemIndex>-1){
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
    }
  }
}
