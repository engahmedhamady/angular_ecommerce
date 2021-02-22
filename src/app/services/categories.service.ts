import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = 'http://localhost:8081/category/findCategoryList';
constructor(private _httpClient: HttpClient) { }




findListCategories() :Observable<Category[]>{

return this._httpClient.get<Category[]>(this.baseUrl )
}

}


// interface GetResponse {


// _embedded: { categories: Category[] }
// }