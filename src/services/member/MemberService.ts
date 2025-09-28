import { genSalt, hash } from 'bcrypt';
import { BaseDataService } from '../DataService';
import { Member } from '../../models/members/Member';

const BASE_ID = 'appYytqUfVu81cjXn';

export class MemberService {
  constructor(private db: BaseDataService) {}

  async getMembers(): Promise<Member[]> {
    return await this.db.getData<Member>(this.db.apiKey, BASE_ID, 'member');
  }

  async saveMember(member: Member) {
    const salt = await genSalt();
    const bPwd = await hash(member.password, salt);

    member.password = bPwd;

    return this.db.saveData(this.db.apiKey, BASE_ID, 'member', member);
  }
}
