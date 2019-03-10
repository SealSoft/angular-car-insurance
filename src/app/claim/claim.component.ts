import {Component, OnInit} from '@angular/core';
import {TokenService} from '../services/token.service';
import {PremiumHolder} from '../models/premiumHolder.model';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit {
  public premiums: PremiumHolder[] = [];
  public modalRef: NgbModalRef;
  public indexSelected = 0;

  constructor(public tokenService: TokenService,
              public toastrService: ToastrService,
              public modalService: NgbModal,
              private spinner: NgxSpinnerService) {
  }

  async ngOnInit() {

    if (this.tokenService._tokenContract === undefined) {
      this.spinner.show();
      const init = await this.tokenService.initContract();
      const isInsured = await this.tokenService._tokenContract.methods.isInsured().call({
        from: this.tokenService.accounts[0]
      });
      if (!isInsured) {
        const num = await this.retrieveOffers();
      } else {
        this.spinner.hide();
        this.toastrService.error('We found a valid insurance for your address. You cannot purchase another before expiration',
          'Already Insured');
      }
    } else {
      this.spinner.show();
      const isInsured = await this.tokenService._tokenContract.methods.isInsured().call({
        from: this.tokenService.accounts[0]
      });
      if (!isInsured) {
        const num = await this.retrieveOffers();
      } else {
        this.spinner.hide()
        this.toastrService.error('We found a valid insurance for your address. You cannot purchase another before expiration',
          'Already Insured');
      }
    }
    this.spinner.hide();
  }

  async retrieveOffers() {
    const offerNumber: number = await this.tokenService._tokenContract.methods.getPremiumHolders().call({
      from: this.tokenService.accounts[0]
    });

    console.log(offerNumber);

    for (let i = 0; i < Number(offerNumber); i++) {
      const member = await this.tokenService._tokenContract.methods.premiumArHolders(i).call({
        from: this.tokenService.accounts[0]
      });
      this.premiums.push(new PremiumHolder(i, member[2], member[1], member[3], member[4], member[0]));
    }

    console.log(this.premiums);

  }

  public openModal(modalContent, premium) {
    this.indexSelected = premium;
    this.modalRef = this.modalService.open(modalContent, {container: '.wrapper'});

  }

  public purchaseSubmit(insured: NgForm) {
    const result = this.purchaseInsurance(insured.form.controls.name.value, insured.form.controls.plate.value);

  }

  async purchaseInsurance(name: string, plate: string) {
    this.spinner.show();
    const insuredPerson = await this.tokenService._tokenContract.methods.requestInsurance(name, plate, this.indexSelected).send({
      from: this.tokenService.accounts[0],
      value: this.tokenService.web3Injector.utils.toWei(this.premiums[this.indexSelected].amount, 'ether'),
      gas: 1000000
    });
    this.spinner.hide();
    console.log(insuredPerson);
    this.toastrService.success('Your insurance program purchased successfully!!', 'Success');
    this.modalRef.close();
  }

}
