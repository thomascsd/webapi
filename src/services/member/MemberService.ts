import { genSalt, hash } from 'bcrypt';
import { DataService } from '@thomascsd/stools';
import { Member } from '../../models/members/Member';

const BASE_ID = 'appYytqUfVu81cjXn';

export class MemberService {
  constructor(private db: DataService) {}

  async getMembers(): Promise<Member[]> {
    return await this.db.getDatas<Member>(BASE_ID, 'member');
  }

  async saveMember(member: Member) {
    const salt = await genSalt();
    const bPwd = await hash(member.password, salt);

    member.password = bPwd;

    return this.db.saveData(BASE_ID, 'member', member);
  }
}
