import { Required, Email, Pattern, MinLength, MaxLength } from '@tsed/schema';
import { plainToClassFromExist } from 'class-transformer';
import { BaseModel } from '@thomascsd/stools';

export class Member extends BaseModel {
  @Required()
  name = '';

  @Required()
  @Email()
  email = '';

  @Required()
  @Pattern(/(\d{4})-(\d{6})/)
  mobile = '';

  birthday: string = '';

  @Required()
  @MinLength(6)
  @MaxLength(12)
  @Pattern(/[a-zA-Z\d]/g)
  account = '';

  @Required()
  @MinLength(6)
  @MaxLength(12)
  @Pattern(/[a-zA-Z\d]/g)
  password = '';

  constructor(data?: any) {
    super();
    plainToClassFromExist(this, data);
  }
}
