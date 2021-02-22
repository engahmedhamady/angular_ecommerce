import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/common/category';
import { CategoriesService } from 'src/app/services/categories.service';
//import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css'],
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories: Category[] = [];
  constructor(
    private _categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listProductCategories();
  }
  listProductCategories() {
    this._categoriesService.findListCategories().subscribe((data) => {
      this.productCategories = data;
    });
  }
}
