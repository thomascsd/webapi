import { BaseModel } from '@thomascsd/stools';

export class User extends BaseModel {
  userId?: number = 0;
  account: string = '';
  password: string = '';
  role: string[] = [];
  token: string = '';
  createTime!: Date;
  roleName?: string[] = [];
}
