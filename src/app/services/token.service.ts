import {Inject, Injectable} from '@angular/core';
import {WEB3} from './web3.service';
import Web3 from 'web3';
const tokenAbi = [
  {
    constant: false,
    inputs: [
      {
        name: '_name',
        type: 'string'
      },
      {
        name: '_plate',
        type: 'string'
      },
      {
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'requestInsurance',
    outputs: [

    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [

    ],
    name: 'getInsuranceInfo',
    outputs: [
      {
        name: '',
        type: 'string'
      },
      {
        name: '',
        type: 'string'
      },
      {
        name: '',
        type: 'uint256'
      },
      {
        name: '',
        type: 'string'
      },
      {
        name: '',
        type: 'uint256'
      },
      {
        name: '',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_name',
        type: 'string'
      },
      {
        name: '_amount',
        type: 'uint256'
      },
      {
        name: '_duration',
        type: 'uint256'
      },
      {
        name: '_description',
        type: 'string'
      }
    ],
    name: 'addPremiumHolders',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    name: 'policyHolders',
    outputs: [
      {
        name: 'name',
        type: 'string'
      },
      {
        name: 'vehiclePlateNumber',
        type: 'string'
      },
      {
        name: 'policyOwnerAddress',
        type: 'address'
      },
      {
        name: 'premium',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    name: 'premiumArHolders',
    outputs: [
      {
        name: 'premiumOwnerAddress',
        type: 'address'
      },
      {
        name: 'amountOfEther',
        type: 'uint256'
      },
      {
        name: 'name',
        type: 'string'
      },
      {
        name: 'duration',
        type: 'uint256'
      },
      {
        name: 'description',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [

    ],
    name: 'getPremiumHolders',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [

    ],
    name: 'getInsuranceHolders',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [

    ],
    name: 'isInsured',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [

    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  }
];
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public _tokenContract: any;
  public _tokenContractAddress = '0x4a5cc3eD489C1ccfD4622036B0b53C9d9D2a89F3';
  public accounts = [];
  public web3Injector;
  constructor(@Inject(WEB3) private web3: Web3) {
    this.web3Injector = web3
    if (this._tokenContract === undefined) {

      this.initContract();
    }
  }

  async initContract() {
    if ('enable' in this.web3.currentProvider) {
      await this.web3.currentProvider.enable();
    }
    this.accounts = await this.web3.eth.getAccounts();
    this._tokenContract = await new this.web3.eth.Contract(tokenAbi, this._tokenContractAddress);
    console.log(this.accounts);

  }
}
