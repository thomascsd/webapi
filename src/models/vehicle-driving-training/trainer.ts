import { BaseModel } from '@thomascsd/stools-models';
import { Customer } from './customer';
export class Trainer extends BaseModel {
  ownerId: string = '';
  name: string = '';
  mobile: string = '';
  createUser: string = '';
  createTime: Date = new Date();
}
