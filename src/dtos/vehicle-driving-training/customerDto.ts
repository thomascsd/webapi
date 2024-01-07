import { Trainer } from '../../models/vehicle-driving-training';

export class CustomerDto {
  custId: string = '';
  name: string = '';
  mobile: string = '';
  birthday: Date = new Date();
  memo: string = '';
  moning = false;
  afternoon = false;
  evening = false;
  trainerId: string = '';
  trainer: Trainer = new Trainer();
  createUser: string = '';
}
