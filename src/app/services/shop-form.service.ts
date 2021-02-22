import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {
private contryUrl="http://localhost:8081/country/countryData";
private stateUrl="http://localhost:8081/state/stateByCountryIdData";
  constructor(private _httpClient:HttpClient) { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);

    }
    return of(data);
  }
  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    const startYear:number=new Date().getFullYear();
    const endYear:number=startYear+10;
    
    for (let theYear = startYear; theYear<= endYear; theYear++) {
      data.push(theYear);

    }
    return of(data);
  }
  getCountries(){
    return this._httpClient.get<Country[]>(this.contryUrl);
  }
  getStates(theCountryCode:number){
    let countryId :number= +theCountryCode;
    const searchStateUrl="http://localhost:8081/state/stateByCountryIdData/"+theCountryCode;
    //+countryId;
    return this._httpClient.get<State[]>(searchStateUrl);
  }
    
}
