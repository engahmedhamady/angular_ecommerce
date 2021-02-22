import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../common/products';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8081/products/productData';
 
  constructor(private _httpClient: HttpClient) { }


  getProductById(id: number) {
    let baseUrlByProductId = 'http://localhost:8081/products/productDataById/' + id;
    return this._httpClient.get<Products>(baseUrlByProductId);
  }

  


    getProductByCategory(id: number) {
      let baseUrlByCategory = 'http://localhost:8081/products/productDataByCategory/'+id;
      return this._httpClient.get<Products[]>(baseUrlByCategory);
    }
    
    searchProducts(thekeyword: string ){
      
        let baseUrlByKeyword = 'http://localhost:8081/products/productSearch/'+thekeyword 
        return this._httpClient.get<Products[]>(baseUrlByKeyword);
      }

}


