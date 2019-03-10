import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {TokenService} from '../services/token.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.scss']
})
export class BrokerComponent implements OnInit {

  constructor(public tokenService: TokenService,
              private spinner: NgxSpinnerService,
              public toastrService: ToastrService) { }

  ngOnInit() {
  }

  brokerSubmit(brokerInfo: NgForm) {
    this.spinner.show();

    const promise = this.addPolicyHolder(
      brokerInfo.form.controls.name.value,
      brokerInfo.form.controls.amount.value,
      brokerInfo.form.controls.duration.value,
      brokerInfo.form.controls.description.value);
  }

  async addPolicyHolder(name: string, amount: number, duration: number, description: string) {
    const policyNumber = await this.tokenService._tokenContract.methods.addPremiumHolders(name, amount, duration, description).send({
      from: this.tokenService.accounts[0],
      value: this.tokenService.web3Injector.utils.toWei('0.1', 'ether'),
      gas: 1000000
    });
    this.spinner.hide();
    this.toastrService.success('Your offer submitted successfully on Rinky network', 'Success offer');
    console.log(policyNumber);
  }

}
