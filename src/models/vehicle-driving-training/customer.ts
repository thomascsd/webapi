import { BaseModel } from '@thomascsd/stools-models';
export class Customer extends BaseModel {
  custId: string = '';
  name: string = '';
  mobile: string = '';
  birthday: string = '';
  memo: string = '';
  createUser: string = '';
  createTime!: Date;
  schedule: string[] = [];
  trainerId: string[] = [];
  trainerName?: string[] = [];
}
