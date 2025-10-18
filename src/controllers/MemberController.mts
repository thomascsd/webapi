import { AirtableResult } from '@thomascsd/stools';
import { Controller, inject } from '@tsed/di';
import { Get, Post } from '@tsed/schema';
import { Member } from '@models/members/Member.mjs';
import { MemberService } from '@services/member/MemberService.mjs';

@Controller('/members')
export class MemberController {
  private memberService: MemberService = inject(MemberService);

  @Get('/list')
  getMembers(): Promise<Member[]> {
    return this.memberService.getMembers();
  }

  @Post('/save')
  saveMember(member: Member): Promise<AirtableResult> {
    return this.memberService.saveMember(member);
  }
}
