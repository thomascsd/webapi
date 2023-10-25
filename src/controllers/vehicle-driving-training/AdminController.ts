import { Controller } from '@tsed/di';
import { Get, Post } from '@tsed/schema';
import { AdminService } from '../../services/vehicle-driving-training/AdminService';
import { UserDto, AddUserDto } from '../../dtos';
import { Role, User } from '../../models/vehicle-driving-training';

@Controller('/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('/signIn')
  async signIn(dto: UserDto) {
    return await this.adminService.SignIn(dto);
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
