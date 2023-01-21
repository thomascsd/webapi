import { BaseModel } from '@thomascsd/stools-models';

export class CustomerSchedule extends BaseModel {
  customerId: string = '';
  schedule: string = '';
  createUser: string = '';
  createTime: Date = new Date();
}
