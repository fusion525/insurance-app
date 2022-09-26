import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export interface InsuranceData {
  pan: string,
  custId: string,
  custName: string,
  custAddress: string,
  postAddress: string,
  idCard: string,
  expire: string,
  phoneNumber: string,
  gender: string
}

export interface InsuranceType {
  name: string,
  value: string
}

@Injectable({
  providedIn: 'root'
})
export class NewInsuranceServiceService {

  constructor() { }

  public getCardData(): Observable<InsuranceData[]> {
    return ajax('http://localhost:3000/carddata').pipe(
      map(response => response.response as InsuranceData[]));
  }

  public getInsuranceType(): Observable<InsuranceType[]> {
    return ajax('http://localhost:3000/insuranceType').pipe(
      map(response => response.response as InsuranceType[])
    );
  }

}