import { Unauthorized } from '@tsed/exceptions';
import { OnVerify, Protocol } from '@tsed/passport';
import { Groups } from '@tsed/schema';
import * as jwt from 'jsonwebtoken';
import { IStrategyOptions, Strategy } from 'passport-local';
import { AdminService } from '@services/vehicle-driving-training/AdminService.mjs';
import { UserDto } from '@dtos/index.mjs';
import { Constant } from '@tsed/di';
import { BodyParams } from '@tsed/platform-params';
import { Req } from '@tsed/platform-http';

@Protocol<IStrategyOptions>({
  name: 'local',
  useStrategy: Strategy,
  settings: {
    usernameField: 'account',
    passwordField: 'password',
  },
})
export class LocalProtocol implements OnVerify {
  constructor(private adminService: AdminService) {}

  @Constant('passport.protocols.jwt.settings')
  jwtSettings: any;

  async $onVerify(@Req() request: Req, @BodyParams() @Groups('credentials') credentials: UserDto) {
    const res = await this.adminService.login(credentials);

    if (!res.success) {
      throw new Unauthorized('Wrong credentials');
    }

    const userDto = res.content;
    const token = this.createJwt(userDto);

    await this.adminService.attachToken(userDto.account || '', token);
    userDto.token = token;

    return userDto;
  }

  createJwt(user: UserDto) {
    const { issuer, audience, secretOrKey, maxAge = 3600 } = this.jwtSettings;
    const now = Date.now();

    return jwt.sign(
      {
        iss: issuer,
        aud: audience,
        sub: user.account,
        exp: now + maxAge * 1000,
        iat: now,
      },
      secretOrKey,
    );
  }
}
