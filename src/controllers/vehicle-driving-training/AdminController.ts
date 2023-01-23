import { Controller } from '@tsed/di';
import { Get, Post } from '@tsed/schema';

@Controller('/user')
export class AdminController {
  constructor() {}

  @Post('/login')
  login() {}

  @Get('/users')
  getUsers() {}

  @Post('/add')
  addUser() {}

  @Post('/update')
  updateUser() {}
}
