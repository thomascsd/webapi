import { Controller } from '@tsed/di';
import { Get, Post, Security } from '@tsed/schema';
import { Authenticate } from '@tsed/passport';
import { AdminService } from '../../services/vehicle-driving-training/AdminService';
import { UserDto, AddUserDto } from '../../dtos';
import { Role, User } from '../../models/vehicle-driving-training';
import { Req } from '@tsed/common';

@Controller('/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('/login')
  @Authenticate('local')
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
  async getUsers(): Promise<User[]> {
    return await this.adminService.getUsers();
  }

  @Post('/user/add')
  async addUser(dto: AddUserDto) {
    return await this.adminService.addUser(dto);
  }

  @Post('user/update')
  async updateUser(user: User) {
    return await this.adminService.updateUser(user);
  }

  @Get('/roles')
  async getRoles(): Promise<Role[]> {
    return await this.adminService.getRoles();
  }
}
