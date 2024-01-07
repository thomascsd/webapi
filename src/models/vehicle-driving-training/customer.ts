import { BaseModel } from '@thomascsd/stools-models';
import { Trainer } from './trainer';
export class Customer extends BaseModel {
  custId: string = '';
  name: string = '';
  mobile: string = '';
  birthday: Date = new Date();
  memo: string = '';
  trainerId: string = '';
  createUser: string = '';
  createTime: Date = new Date();
  schedule = '';
  trainer: Trainer = new Trainer();
}
