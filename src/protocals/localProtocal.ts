import { BodyParams, Constant, Req } from '@tsed/common';
import { Unauthorized } from '@tsed/exceptions';
import { OnVerify, Protocol } from '@tsed/passport';
import { Groups } from '@tsed/schema';
import * as jwt from 'jsonwebtoken';
import { IStrategyOptions, Strategy } from 'passport-local';
import { AdminService } from '../services/vehicle-driving-training/AdminService';
import { SignInDto } from '../dtos';

@Protocol<IStrategyOptions>({
  name: 'local',
  useStrategy: Strategy,
  settings: {
    usernameField: 'email',
    passwordField: 'password',
  },
})
export class LocalProtocol implements OnVerify {
  constructor(private adminService: AdminService) {}

  @Constant('passport.protocols.jwt.settings')
  jwtSettings: any;

  async $onVerify(
    @Req() request: Req,
    @BodyParams() @Groups('credentials') credentials: SignInDto
  ) {
    const user = await this.adminService.SignIn(credentials);

    if (!user) {
      throw new Unauthorized('Wrong credentials');
    }

    const token = this.createJwt(user);

    this.adminService.attachToken(user, token);

    return user;
  }

  createJwt(user: User) {
    const { issuer, audience, secretOrKey, maxAge = 3600 } = this.jwtSettings;
    const now = Date.now();

    return jwt.sign(
      {
        iss: issuer,
        aud: audience,
        sub: user.id,
        exp: now + maxAge * 1000,
        iat: now,
      },
      secretOrKey
    );
  }
}
