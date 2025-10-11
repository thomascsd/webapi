import { Required, Email, Pattern, Property } from '@tsed/schema';
import { BaseModel } from '@thomascsd/stools';

export class Contact extends BaseModel {
  constructor() {
    super();
  }

  @Required()
  @Property()
  name: string = '';

  @Required()
  @Email()
  @Property()
  email: string = '';

  @Required()
  @Pattern(/(\d{4})-(\d{6})/)
  @Property()
  mobile: string = '';
}
