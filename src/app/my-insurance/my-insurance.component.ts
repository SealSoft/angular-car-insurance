import { Component, OnInit } from '@angular/core';
import {TokenService} from '../services/token.service';
import {InsuredInfo} from '../models/insuredInfo.model';

@Component({
  selector: 'app-my-insurance',
  templateUrl: './my-insurance.component.html',
  styleUrls: ['./my-insurance.component.scss']
})
export class MyInsuranceComponent implements OnInit {
  public insured: InsuredInfo;
  constructor(public tokenService: TokenService) { }

  async ngOnInit() {
    if (this.tokenService._tokenContract === undefined) {
      const init = await this.tokenService.initContract();
      const num = await this.retrieveInsurance();
    } else {

      const num = await this.retrieveInsurance();
    }
  }

  async retrieveInsurance() {
    const insurance = await this.tokenService._tokenContract.methods.getInsuranceInfo().call({
      from: this.tokenService.accounts[0]
    });
    console.log(insurance);
    this.insured = new InsuredInfo(1, insurance[0], insurance[1], insurance[2], insurance[3], insurance[4], insurance[5]);
  }

}
