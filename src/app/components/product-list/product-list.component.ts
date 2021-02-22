import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Products } from 'src/app/common/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Products[] = [];
  //product: Products;
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  hasCategoryId: boolean;

  previosCategoryId: number = 1;


  constructor(
    private _productService: ProductService,
    private _cartService: CartService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.listProductByCategory();
    }
  }



  listProductByCategory() {
    this.hasCategoryId = this.route.snapshot.paramMap.has('id');
    console.log(this.hasCategoryId);

    if (this.hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');

    } else {
      this.currentCategoryId = 1;
    }


    this.previosCategoryId = this.currentCategoryId;
    this._productService
      .getProductByCategory(
        this.currentCategoryId)
      .subscribe(data => {
        this.products = data;

      });
  }


  handleSearchProducts() {
    const keyWord: string = this.route.snapshot.paramMap.get('keyword');
    console.log(keyWord)

    this._productService.searchProducts(keyWord).
      subscribe(data => {
        this.products = data;

      });
  }


  addToCart(theProduct: Products) {
    const theCartItem = new CartItem(theProduct);
    this._cartService.addToCart(theCartItem);


  }


}
