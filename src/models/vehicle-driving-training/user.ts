import { BaseModel } from '@thomascsd/stools-models';

export class User extends BaseModel {
  userId?: number = 0;
  account: string = '';
  password: string = '';
  role: string[] = [];
  createTime!: Date;
}
