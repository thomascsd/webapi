import { BaseModel } from '@thomascsd/stools';
import { Customer } from './customer';
export class Trainer extends BaseModel {
  ownerId: string = '';
  name: string = '';
  mobile: string = '';
  customers: Customer[] = [];
  createUser: string = '';
  createTime: Date = new Date();
}
