import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HeaderComponent} from './theme/components/header/header.component';
import {HomeComponent} from './home/home.component';
import {InsuranceValidatorComponent} from './insurance-validator/insurance-validator.component';
import {BrokerComponent} from './broker/broker.component';
import {ClaimComponent} from './claim/claim.component';
import {MyInsuranceComponent} from './my-insurance/my-insurance.component';
import {ToastrModule} from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    InsuranceValidatorComponent,
    BrokerComponent,
    ClaimComponent,
    MyInsuranceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    NgxSpinnerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
