import { Customer } from './customer';
export class Trainer {
  ownerId: string = '';
  name: string = '';
  mobile: string = '';
  customers: Customer[] = [];
  createUser: string = '';
  createTime: Date = new Date();
}
