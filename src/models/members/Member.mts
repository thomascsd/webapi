import {
  IsNotEmpty,
  IsEmail,
  IsMobilePhone,
  ValidationOptions,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';
import { plainToClassFromExist } from 'class-transformer';
import { BaseModel } from '@thomascsd/stools';

const options: ValidationOptions = { message: '填寫正式資料' };

export class Member extends BaseModel {
  @IsNotEmpty({
    message: '姓名需填寫',
  })
  name = '';

  @IsNotEmpty({
    message: 'Email需填寫',
  })
  @IsEmail()
  email = '';

  @IsNotEmpty({
    message: '手機需填寫',
  })
  @IsMobilePhone(
    'zh-TW',
    {
      strictMode: false,
    },
    {
      message: '手機需填寫',
    }
  )
  mobile = '';

  birthday: string = '';

  @IsNotEmpty(options)
  @MinLength(6, options)
  @MaxLength(12, options)
  @Matches(/[a-zA-Z\d]/g, options)
  account = '';

  @IsNotEmpty(options)
  @MinLength(6, options)
  @MaxLength(12, options)
  @Matches(/[a-zA-Z\d]/g, options)
  password = '';

  constructor(data?: any) {
    super();
    plainToClassFromExist(this, data);
  }
}
