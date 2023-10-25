import { Service } from '@tsed/di';
import bcrypt from 'bcrypt';
import { DataService } from '../DataService';
import { User, Role } from '../../models/vehicle-driving-training';
import { UserDto, BaseRes, AddUserDto } from '../../dtos';

const BASE_Id = 'appGxC02yunTmPXRh';

@Service()
export class AdminService {
  constructor(private db: DataService) {}

  async SignIn(dto: UserDto): Promise<BaseRes<UserDto>> {
    const res: BaseRes<UserDto> = { success: true, content: new UserDto() };
    const users = await this.getUsers();
    const selectedUsers = users.filter((u) => u.account === dto.account);

    if (selectedUsers.length === 0) {
      return { success: false, errorMessage: '', content: new UserDto() };
    }

    const user = selectedUsers[0];
    const hash = user.password;
    const valid = await bcrypt.compare(dto.password || '', hash);

    res.success = valid;
    res.content = {
      id: user.id,
      roleName: user.role[0],
    };

    return res;
  }

  async attachToken(id: string, token: string) {
    const user = await this.findUser(id);
    user.token = token;
    await this.updateUser(user);
  }

  async findUser(id: string): Promise<User> {
    const users = await this.db.getData<User>(BASE_Id, 'user', {
      where: {
        id,
      },
    });

    if (users.length) {
      return users[0];
    }

    return new User();
  }

  async getUsers(): Promise<User[]> {
    return await this.db.getData<User>(BASE_Id, 'user');
  }

  async addUser(dto: AddUserDto) {
    const saltRounds = 10;
    const user: User = {
      account: dto.account,
      password: await bcrypt.hash(dto.password, saltRounds),
      role: [dto.roleId],
      createTime: new Date(),
      token: '',
    };

    return await this.db.saveData<User>(BASE_Id, 'user', user);
  }

  async updateUser(user: User) {
    return await this.db.updateData<User>(BASE_Id, 'user', user);
  }

  async getRoles(): Promise<Role[]> {
    return await this.db.getData<Role>(BASE_Id, 'role');
  }
}
