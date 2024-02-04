import { Schedule, Trainer } from '../../models/vehicle-driving-training';

export class CustomerRes {
  custId: string = '';
  name: string = '';
  mobile: string = '';
  memo: string = '';
  trainer!: Trainer;
  schedule!: Schedule;
}
