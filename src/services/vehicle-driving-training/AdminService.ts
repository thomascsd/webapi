import { Service } from '@tsed/di';
import { DataService } from '../DataService';
import { User } from '../../models/vehicle-driving-training/user';
import { Role } from '../../models/vehicle-driving-training/role';

const BASE_Id = 'appGxC02yunTmPXRh';

@Service()
export class AdminService {
  constructor(private db: DataService) {}

  async getUsers(): Promise<User[]> {
    return await this.db.getData<User>(BASE_Id, 'user');
  }

  async addUser(user: User) {
    return await this.db.saveData<User>(BASE_Id, 'user', user);
  }

  async updateUser(user: User) {
    return await this.db.updateData<User>(BASE_Id, 'user', user);
  }

  async getRole() {
    return await this.db.getData<Role>(BASE_Id, 'role');
  }
}
