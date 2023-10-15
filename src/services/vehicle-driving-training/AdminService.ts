import { Service } from '@tsed/di';
import bcrypt from 'bcrypt';
import { DataService } from '../DataService';
import { User, Role } from '../../models/vehicle-driving-training';
import { UserDto, SignInDto, BaseObj } from '../../dtos';

const BASE_Id = 'appGxC02yunTmPXRh';

@Service()
export class AdminService {
  constructor(private db: DataService) {}

  async SignIn(signInDto: SignInDto): Promise<BaseObj> {
    const res: BaseObj = { success: true };
    const users = await this.getUsers();
    const selectedUsers = users.filter((u) => u.account === signInDto.account);

    if (selectedUsers.length === 0) {
      return { success: false, errorMessage: '' };
    }

    const user = selectedUsers[0];
    const hash = user.password;
    const valid = await bcrypt.compare(signInDto.password, hash);

    res.success = valid;

    return res;
  }

  async getUsers(): Promise<User[]> {
    return await this.db.getData<User>(BASE_Id, 'user');
  }

  async addUser(dto: UserDto) {
    const saltRounds = 10;
    const user: User = {
      account: dto.account,
      password: await bcrypt.hash(dto.password, saltRounds),
      role: [dto.roleId],
      createTime: new Date(),
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
