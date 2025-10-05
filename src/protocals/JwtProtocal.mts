import { Req } from '@tsed/common';
import { Arg, OnVerify, Protocol } from '@tsed/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminService } from '../services/vehicle-driving-training/AdminService.mjs';
import { Unauthorized } from '@tsed/exceptions';

@Protocol({
  name: 'jwt',
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'thisismysupersecretprivatekey1',
    issuer: 'localhost',
    audience: 'localhost',
  },
})
export class JwtProtocol implements OnVerify {
  constructor(private adminService: AdminService) {}

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any) {
    const user = await this.adminService.findUser(jwtPayload.sub);

    if (!user.id) {
      throw new Unauthorized('Wrong token');
    }

    req.user = user;

    return user;
  }
}
