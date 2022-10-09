import { BaseModel } from '@thomascsd/stools';
import { Trainer } from './trainer';
export class Customer extends BaseModel {
  ownerId: string = '';
  name: string = '';
  mobile: string = '';
  meno: string = '';
  trainerId: string = '';
  createUser: string = '';
  createTime: Date = new Date();
  trainer: Trainer = new Trainer();
}
