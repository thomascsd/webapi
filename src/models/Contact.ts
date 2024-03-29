import { IsNotEmpty, IsEmail, IsMobilePhone } from 'class-validator';
import { BaseModel } from '@thomascsd/stools-models';

export class Contact extends BaseModel {
  constructor() {
    super();
  }

  @IsNotEmpty({
    message: '姓名為必需填寫',
  })
  name: string = '';

  @IsNotEmpty({
    message: 'Email為必需填寫',
  })
  @IsEmail()
  email: string = '';

  @IsNotEmpty({
    message: '手機為必需填寫',
  })
  @IsMobilePhone('zh-TW')
  mobile: string = '';
}
