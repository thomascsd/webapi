import { Trainer } from './trainer';
export class Customer {
  ownerId: string = '';
  name: string = '';
  mobile: string = '';
  trainer: Trainer = new Trainer();
  meno: string = '';
  createUser: string = '';
  createTime: Date = new Date();
}
