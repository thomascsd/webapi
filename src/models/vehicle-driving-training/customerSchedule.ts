import { BaseModel } from '@thomascsd/stools-models';

export class Schedule extends BaseModel {
  schedule: string = '';
  customerId: string = '';
  morning: boolean = false;
  afternoon: boolean = false;
  evening: boolean = false;
  createUser: string = '';
  createTime: Date = new Date();
}
