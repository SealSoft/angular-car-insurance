export class PremiumHolder {
  index: number;
  name: string;
  amount: number;
  duration: number;
  description: string;
  premiumOwnerAddress: string;

  constructor(index: number, name: string, amount: number, duration: number, description: string, premiumOwnerAddress: string) {
    this.index = index;
    this.name = name;
    this.amount = amount;
    this.duration = duration;
    this.description = description;
    this.premiumOwnerAddress = premiumOwnerAddress;
  }
}
