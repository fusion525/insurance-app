import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
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

export interface NewInsurance {
  insuType: string,
  startDay: string,
  extra: string,
  pan: string
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

  public postInsuranceData(data: NewInsurance): Observable<NewInsurance> {
    return ajax({
      url: 'http://localhost:3000/newinsurances',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'rxjs-custom-header': 'Rxjs'
      },
      body: {
        data
      }
    }).pipe(
      map(response => response.response as NewInsurance)
    );
  }

}