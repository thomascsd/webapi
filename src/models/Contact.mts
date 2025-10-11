import { Required, Email, Pattern } from '@tsed/schema';
import { BaseModel } from '@thomascsd/stools';

export class Contact extends BaseModel {
  constructor() {
    super();
  }

  @Required()
  name: string = '';

  @Required()
  @Email()
  email: string = '';

  @Required()
  @Pattern(/(\d{4})-(\d{6})/)
  mobile: string = '';
}
