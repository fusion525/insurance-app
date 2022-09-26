import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom, of } from 'rxjs';
import { NewInsuranceServiceService, InsuranceData, InsuranceType } from 'src/app/services/new-insurance-service.service';

interface Gender {
  value: string;
  viewValue: String;
}

@Component({
  selector: 'app-new-insurance',
  templateUrl: './new-insurance.component.html',
  styleUrls: ['./new-insurance.component.scss']
})
export class NewInsuranceComponent implements OnInit, OnDestroy {

  constructor(
    private insuranceService: NewInsuranceServiceService
  ) { }

  genders: Gender[] = [
    { value: '1', viewValue: "Male" },
    { value: '2', viewValue: "Female" }
  ];

  insuranceType: InsuranceType[] = [];

  insuranceForm = new FormGroup({
    pan: new FormControl('', [Validators.required,
    Validators.pattern('^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$')]),
    custId: new FormControl({ value: '', disabled: false }, [Validators.pattern('[a-zA-Z0-9]{8,12}$')]),
    custName: new FormControl({ value: '', disabled: true }),
    custAddress: new FormControl({ value: '', disabled: true }),
    postAddress: new FormControl({ value: '', disabled: true }),
    idCard: new FormControl({ value: '', disabled: true }),
    expire: new FormControl({value: '', disabled: true}),
    phoneNumber: new FormControl({ value: '', disabled: true }),
    gender: new FormControl({ value: '', disabled: true })
  });

  applyForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
    startDay: new FormControl({value: '', disabled: true}, [Validators.required]),
    extra: new FormGroup('', [Validators.required])
  })

  getError(path: string, errorName: string) {
    const formControl = (this.insuranceForm.get(path) as FormControl);
    if (formControl.untouched && formControl.pristine) {
      return;
    }
    return formControl.errors?.[errorName];
  };

  async getInsurancedata() {
    const insuranceData = await lastValueFrom(this.insuranceService.getCardData());
    const formControl = this.insuranceForm.controls;
    let pan = this.insuranceForm.get('pan')?.value as string;

    let found: InsuranceData = { pan: '', custId: '', custName: '', custAddress: '', postAddress: '', idCard: '', expire: '', phoneNumber: '', gender: '' };

    for (let el of insuranceData) {
      if (el.pan === pan) {
        found = el;
      }
    }

    let k: keyof InsuranceData;

    for (k in this.insuranceForm.controls) {
      (formControl)[k].setValue((found)[k]);
    }

  }

  clearForm() {
    this.insuranceForm.reset();
  }

  async getInsuranceTypes(): Promise<InsuranceType[]> {
    return await lastValueFrom(this.insuranceService.getInsuranceType());
  }

  loadInsuranceTypes(data: Promise<InsuranceType[]>) {
    data.then(value => value.forEach(value => {
      this.insuranceType.push(value);
    }))
  }

  ngOnInit(): void {
    this.loadInsuranceTypes(this.getInsuranceTypes());
  }

  ngOnDestroy(): void {

  }

}
