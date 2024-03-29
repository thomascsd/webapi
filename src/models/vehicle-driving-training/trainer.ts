import { BaseModel } from '@thomascsd/stools-models';

export class Trainer extends BaseModel {
  custId: string = '';
  name: string = '';
  mobile: string = '';
  createUser: string = '';
  createTime: Date = new Date();
}
