export class InsuredInfo {
  index: number;
  name: string;
  plate: string;
  amountPaid: number;
  broker: string;
  duration: number;
  description: string;

  constructor(index: number, name: string, plate: string, amountPaid: number, broker: string, duration: number, description: string) {
    this.index = index;
    this.name = name;
    this.plate = plate;
    this.amountPaid = amountPaid;
    this.broker = broker;
    this.duration = duration;
    this.description = description;
  }
}
