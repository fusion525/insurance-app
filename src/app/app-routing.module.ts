import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewInsuranceComponent } from './components/new-insurance/new-insurance.component'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'new-insurance', component: NewInsuranceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
