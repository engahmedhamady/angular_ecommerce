import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Products } from 'src/app/common/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Products = new Products();
  constructor(private _productService: ProductService, private _cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }



  handleProductDetails() {
    const theProductId: number = +this.route.snapshot.paramMap.get('id');
    this._productService.getProductById(theProductId).subscribe
      (data => { this.product = data; })
  }

  listProductById() {

    let productId: number = +this.route.snapshot.paramMap.get('id');

    this._productService.getProductById(productId).subscribe(data => { this.product = data; })
  }
  addToCart() {
    const theCartItem = new CartItem(this.product);
    this._cartService.addToCart(theCartItem);


  }
}
