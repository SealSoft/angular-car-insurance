import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {TokenService} from '../services/token.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-insurance-validator',
  templateUrl: './insurance-validator.component.html',
  styleUrls: ['./insurance-validator.component.scss']
})
export class InsuranceValidatorComponent implements OnInit {

  constructor(public tokenService: TokenService,
              private spinner: NgxSpinnerService,
              public toastrService: ToastrService) {
  }

  ngOnInit() {
  }

  selfValidate() {
    this.spinner.show();
    const result = this.isProvidedInsured();
  }

  async isProvidedInsured() {
    const isInsured = await this.tokenService._tokenContract.methods.isInsured().call({
      from: this.tokenService.accounts[0]
    });
    if (isInsured) {
      this.toastrService.success('Valid insurance found for your current address', 'Insured');
    } else {
      this.toastrService.info('No insurance found for the current address', 'Not insured');
    }

    this.spinner.hide();
    console.log(isInsured);
  }

  addressValidate(addressValidate: NgForm) {
    this.spinner.show();
    const result = this.isByAddressInsured(addressValidate.form.controls.address.value);


  }

  async isByAddressInsured(address: string) {
    const isInsured = await this.tokenService._tokenContract.methods.isInsured().call({
      from: address
    });
    if (isInsured) {
      this.toastrService.success('Valid insurance found for the submitted address', 'Insured');
    } else {
      this.toastrService.info('No insurance found for the submitted address', 'Not insured');
    }
    this.spinner.hide();
    console.log(isInsured);
  }

}
