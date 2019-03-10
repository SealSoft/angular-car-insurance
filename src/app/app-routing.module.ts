import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {InsuranceValidatorComponent} from './insurance-validator/insurance-validator.component';
import {BrokerComponent} from './broker/broker.component';
import {ClaimComponent} from './claim/claim.component';
import {MyInsuranceComponent} from './my-insurance/my-insurance.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'insurance-validator', component: InsuranceValidatorComponent},
  {path: 'insurance-claim', component: ClaimComponent},
  {path: 'insurance-broker', component: BrokerComponent},
  {path: 'my-insurance', component: MyInsuranceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
