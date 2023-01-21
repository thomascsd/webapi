import { JsonController, Get, Post, Body } from 'routing-controllers-extended';
import { Service } from 'typedi';

@Service()
@JsonController()
export class AdminController {
  constructor() {}

  @Post('/login')
  login() {}

  @Get('/users')
  getUsers() {}

  @Post('user/add')
  addUser() {}

  @Post('user/update')
  updateUser() {}
}
