import { Controller } from '@tsed/di';
import { Get, Post } from '@tsed/schema';
import { MemberService } from '../services/member/MemberService';

@Controller('/members')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get('/list')
  getMembers() {}

  @Post('/save')
  saveMember() {}
}
