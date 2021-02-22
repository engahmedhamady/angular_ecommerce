import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItems } from 'src/app/common/order-items';

import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckOutService } from 'src/app/services/check-out.service';
import { ShopFormService } from 'src/app/services/shop-form.service';
import { ShopValidators } from 'src/app/validators/shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYear: number[] = [];
  creditCardMonth: number[] = [];
  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  constructor(private _formBuilder: FormBuilder,
    private _shopForm: ShopFormService,
    private _cartService: CartService,
    private _checkoutService: CheckOutService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.reviewCartDetails();
    this.checkoutFormGroup = this._formBuilder.group({
      customer: this._formBuilder.group({
        fname: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpace]),
        lname: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpace]),
        email: new FormControl('',
          [Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this._formBuilder.group({
        street: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpace]),

        city: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpace]),

        state: new FormControl('',
          [Validators.required]),

        country: new FormControl('',
          [Validators.required]),

        zipCode: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpace]),

      }),
      creditCard: this._formBuilder.group({
        cardType: new FormControl('',
          [Validators.required]),

        nameOnCard: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpace]),

        cardNumber: new FormControl('',
          [Validators.required,
          Validators.pattern('[0-9]{16}')])
        ,

        securityCode: new FormControl('',
          [Validators.required,
          Validators.pattern('[0-9]{3}')]),

        expirationMonth: [''],
        expirationYear: ['']
      }),
      billingAddress: this._formBuilder.group({
        street: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpace]),

        city: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpace]),

        state: new FormControl('',
          [Validators.required]),

        country: new FormControl('',
          [Validators.required]),

        zipCode: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpace]),

      })

    })
    const startMonth: number = new Date().getMonth() + 1;
    this._shopForm.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.creditCardMonth = data;
      }
    );
    this._shopForm.getCreditCardYears().subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.creditCardYear = data;
      }
    );
    this._shopForm.getCountries().subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.countries = data;
      }
    );
  }
  reviewCartDetails() {
    this._cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );
    this._cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }

  getFName() {
    return this.checkoutFormGroup.get('customer.fname');
  }
  getLName() {
    return this.checkoutFormGroup.get('customer.lname');
  }
  getEmail() {
    return this.checkoutFormGroup.get('customer.email');
  }
  getShippingAdressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  getShippingAdressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  getShippingAdressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  getShippingAdressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }
  getShippingAdressZipcode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }
  getBillingAdressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  getBillingAdressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  getBillingAdressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  getBillingAdressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }
  getBillingAdressZipcode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }
  getCreditNameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }
  getCreditCardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  getCrediteScurityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }
  getCreditCardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }


  copyShippingAddressToBillingAdress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.
        setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      this.billingAddressStates = this.shippingAddressStates;
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset;
      this.billingAddressStates = [];
    }
  }
  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    
    const cartItems = this._cartService.cartItems;

    // let orderItems: OrderItems[]=[];
    // for(let i=0;i<cartItems.length;i++){
    // orderItems[i]= new OrderItems(cartItems[i]);
      
    // }

  let orderItems: OrderItems[] = cartItems.map(tempCartItem => new OrderItems(tempCartItem));

    let purchase = new Order();
    purchase.shipperAddress = this.checkoutFormGroup.controls['shippingAddress'].value;

    const shippingState: State = JSON.parse(JSON.stringify(purchase.shipperAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shipperAddress.country));
    purchase.shipperAddress.state = shippingState.name;
    purchase.shipperAddress.country = shippingCountry.name;

    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;

    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    purchase.customer=this.checkoutFormGroup.controls['customer'].value
    console.log(purchase.customer);
    purchase.totalPrice = this.totalPrice;
    purchase.totalQuantity = this.totalQuantity;
    purchase.orderItems = orderItems;

    this._checkoutService.placeOrder(purchase).subscribe(

      {
        
         
        next: response => {
          console.log(response)
          console.log(purchase)
          alert('your order has been recieved.\n order tracking number:'+response.orderTrackingNumber);
          //console.log(response)
          this.resetCart();
        }
        ,
        error: err => { alert('there was an error :'+err.message) }
      }
    );
  }
  resetCart() {
    this._cartService.cartItems = [];
    this._cartService.totalPrice.next(0);
    this._cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset();
    this.router.navigateByUrl("/products");
  }
  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectYear: number = Number(creditCardFormGroup.value.expirationYear);
    let startMonth: number;
    if (currentYear === selectYear) {
      startMonth = new Date().getMonth() + 1;

    } else {
      startMonth = 1;
    }
    this._shopForm.getCreditCardMonths(startMonth).subscribe(
      data => { this.creditCardMonth = data; }
    )
  }
  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryId = formGroup.value.country.id;
    const countryName = formGroup.value.country.name;
    console.log(countryId + "------" + countryName)

    this._shopForm.getStates(countryId).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }
        formGroup.get('state').setValue(data[0]);

      }
    )
  }
}
