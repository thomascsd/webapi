import { Controller } from '@tsed/di';
import { Get, Post, Security } from '@tsed/schema';
import { Authenticate, Authorize } from '@tsed/passport';
import { BodyParams, Req } from '@tsed/common';
import { AdminService } from '../../services/vehicle-driving-training/AdminService.mjs';
import { UserDto, AddUserDto } from '../../dtos/index.mjs';
import { Role, User } from '../../models/vehicle-driving-training/Index.mjs';

@Controller('/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('/login')
  @Authenticate('local', {
    session: false,
  })
  async login(@Req('user') user: UserDto) {
    return user;
  }

  @Get('/userinfo')
  @Authenticate('jwt')
  @Security('jwt')
  getUserInfo(@Req('user') user: UserDto) {
    return user;
  }

  @Get('/users')
  @Authorize('jwt')
  async getUsers(): Promise<User[]> {
    return await this.adminService.getUsers();
  }

  @Post('/user/add')
  async addUser(@BodyParams() dto: AddUserDto) {
    return await this.adminService.addUser(dto);
  }

  @Post('user/update')
  @Authorize('jwt')
  async updateUser(user: User) {
    return await this.adminService.updateUser(user);
  }

  @Get('/roles')
  async getRoles(): Promise<Role[]> {
    return await this.adminService.getRoles();
  }
}
