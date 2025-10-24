import { Required, Email, Pattern, MinLength, MaxLength, Property } from '@tsed/schema';
import { BaseModel } from '@thomascsd/stools';

export class Member extends BaseModel {
  @Required()
  @Property()
  name = '';

  @Required()
  @Email()
  @Property()
  email = '';

  @Required()
  @Pattern(/(\d{4})-(\d{6})/)
  @Property()
  mobile = '';

  @Property()
  birthday: string = '';

  @Required()
  @MinLength(6)
  @MaxLength(12)
  @Pattern(/[a-zA-Z\d]/g)
  @Property()
  account = '';

  @Required()
  @MinLength(6)
  @MaxLength(12)
  @Pattern(/[a-zA-Z\d]/g)
  @Property()
  password = '';
}
