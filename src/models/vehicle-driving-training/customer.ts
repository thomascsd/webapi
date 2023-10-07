import { BaseModel } from '@thomascsd/stools-models';
import { Trainer } from './trainer';
export class Customer extends BaseModel {
  custId: string = '';
  name: string = '';
  mobile: string = '';
  birthday: Date = new Date();
  meno: string = '';
  trainerId: string = '';
  createUser: string = '';
  createTime: Date = new Date();
  trainer: Trainer = new Trainer();
}
