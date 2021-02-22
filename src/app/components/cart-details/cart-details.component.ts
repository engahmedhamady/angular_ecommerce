import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
cartItems: CartItem[]=[];
totalPrice:number =0;
totalQuantity:number =0;
  constructor(private _cartServce:CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    this.cartItems= this._cartServce.cartItems;
    this._cartServce.totalPrice.subscribe((data) => 
    this.totalPrice = data);
    this._cartServce.totalQuantity.subscribe((data) => 
    this.totalQuantity = data);
    this._cartServce.computeCartTotals();
  }

  incrementQuantity(theCartItem:CartItem){

    this._cartServce.addToCart(theCartItem);
  }
  decrementQuantity(theCartItem:CartItem){

    this._cartServce.decrementQuantity(theCartItem);
  }
  remove(theCartItem:CartItem){
    this._cartServce.remove(theCartItem);
  }
}
