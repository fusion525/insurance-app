import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInsuranceComponent } from './new-insurance.component';

describe('NewInsuranceComponent', () => {
  let component: NewInsuranceComponent;
  let fixture: ComponentFixture<NewInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
