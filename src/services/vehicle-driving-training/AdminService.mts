import { Service } from '@tsed/di';
import { compare, hash } from 'bcrypt';
import { BaseDataService } from '../DataService.mjs';
import { User, Role } from '../../models/vehicle-driving-training/Index.mjs';
import { UserDto, BaseRes, AddUserDto } from '../../dtos/index.mjs';

const BASE_Id = 'appGxC02yunTmPXRh';

@Service()
export class AdminService {
  constructor(private db: BaseDataService) {}

  async login(dto: UserDto): Promise<BaseRes<UserDto>> {
    const res: BaseRes<UserDto> = { success: true, content: new UserDto() };
    const users = await this.getUsers();
    const selectedUsers = users.filter((u) => u.account === dto.account);

    if (selectedUsers.length === 0) {
      return { success: false, errorMessage: '', content: new UserDto() };
    }

    const user = selectedUsers[0];
    const hash = user.password;
    const valid = await compare(dto.password || '', hash);

    res.success = valid;
    res.content = {
      id: user.id,
      account: user.account,
      roleName: !!user.roleName ? user.roleName[0] : '',
      token: user.token,
    };

    return res;
  }

  async attachToken(account: string, token: string) {
    const user = await this.findUser(account);
    user.token = token;
    await this.updateUser(user);
  }

  async findUser(account: string): Promise<User> {
    const users = await this.db.getData<User>(this.db.apiKey, BASE_Id, 'user', {
      filterByFormula: `{account}='${account}'`,
    });

    if (users.length) {
      return users[0];
    }

    return new User();
  }

  async getUsers(): Promise<User[]> {
    return await this.db.getData<User>(this.db.apiKey, BASE_Id, 'user');
  }

  async addUser(dto: AddUserDto) {
    const saltRounds = 10;
    const user: User = {
      account: dto.account,
      password: await hash(dto.password, saltRounds),
      role: [dto.roleId],
      createTime: new Date(),
      token: '',
    };

    return await this.db.saveData<User>(this.db.apiKey, BASE_Id, 'user', user);
  }

  async updateUser(user: User) {
    delete user.userId;
    delete user.roleName;
    return await this.db.updateData<User>(this.db.apiKey, BASE_Id, 'user', user);
  }

  async getRoles(): Promise<Role[]> {
    return await this.db.getData<Role>(this.db.apiKey, BASE_Id, 'role');
  }
}
