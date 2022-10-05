import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewInsuranceServiceService, InsuranceData, InsuranceType, NewInsurance } from 'src/app/services/new-insurance-service.service';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../dialog/dialog.component';
import { Subscription } from 'rxjs';

export interface Gender {
  value: string;
  viewValue: String;
}

@Component({
  selector: 'app-new-insurance',
  templateUrl: './new-insurance.component.html',
  styleUrls: ['./new-insurance.component.scss']
})
export class NewInsuranceComponent implements OnInit, OnDestroy, AfterViewInit {

  public insuranceForm = new FormGroup({
    pan: new FormControl('', [Validators.required,
    Validators.pattern('^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$')]),
    custId: new FormControl({ value: '', disabled: false }, [Validators.pattern('[a-zA-Z0-9]{8,12}$')]),
    custName: new FormControl({ value: '', disabled: true }),
    custAddress: new FormControl({ value: '', disabled: true }),
    postAddress: new FormControl({ value: '', disabled: true }),
    idCard: new FormControl({ value: '', disabled: true }),
    expire: new FormControl({ value: '', disabled: true }),
    phoneNumber: new FormControl({ value: '', disabled: true }),
    gender: new FormControl({ value: '', disabled: true })
  });

  public applyForm = new FormGroup({
    type: new FormControl({ value: '', disabled: true }, [Validators.required]),
    startDay: new FormControl({ value: '', disabled: true }, [Validators.required]),
    extra: new FormControl({ value: '', disabled: true }, [Validators.required])
  });

  public readonly genders: Gender[] = [
    { value: '1', viewValue: "Male" },
    { value: '2', viewValue: "Female" }
  ];

  public insuranceType: InsuranceType[] = [];

  private dataSubscriptions: Subscription = new Subscription();

  constructor(
    private insuranceService: NewInsuranceServiceService,
    private dialog: MatDialog,
  ) { }

  public getError(path: string, errorName: string) {
    const formControl = (this.insuranceForm.get(path) as FormControl);
    if (formControl.untouched && formControl.pristine) {
      return;
    }
    return formControl.errors?.[errorName];
  };

  public enableApplyFields() {
    const formControl = this.applyForm.controls;

    (Object.keys(formControl) as (keyof typeof formControl)[]).forEach(
      key => {
        formControl[key].enable();
      }
    );
  }

  public getInsuranceData() {
    this.dataSubscriptions.add(this.insuranceService.getCardData().subscribe({
      next: data => {
        const formControl = this.insuranceForm.controls;
        let pan = this.insuranceForm.get('pan')?.value as string;
        let found = {} as InsuranceData;

        data.forEach(element => {
          if (element.pan === pan) {
            found = element;
          }
        });

        (Object.keys(formControl) as (keyof typeof formControl)[]).forEach(key => {
          formControl[key].setValue((found[key]));
        });
      },
      complete: () => this.enableApplyFields(),
      error: (err) => this.dialog.open(DialogComponent, { data: err })
    }));

  }

  public clearForm() {
    this.insuranceForm.reset();
  }

  public postInsuranceData() {
    const data: NewInsurance = {
      insuType: this.applyForm.get('type')?.value as string,
      startDay: this.applyForm.get('startDay')?.value as string,
      extra: this.applyForm.get('extra')?.value as string,
      pan: this.insuranceForm.get('pan')?.value as string,
    }

    this.dataSubscriptions.add(this.insuranceService.postInsuranceData(data).subscribe({
      next: () => {
        this.dialog.open(DialogComponent, {data: 'Data sent Successfully'});
      },
      error: (error) => this.dialog.open(DialogComponent, { data: error })
    }
    ));

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.dataSubscriptions.unsubscribe();

  }

  ngAfterViewInit(): void {
    this.dataSubscriptions.add(this.insuranceService.getInsuranceType().subscribe(data => {
      this.insuranceType = data;
    }));
  }

}
