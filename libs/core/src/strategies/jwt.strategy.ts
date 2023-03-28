import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { appConfig } from '../config';
import { SessionService } from '../../../../src/modules/session/session.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly sessionService: SessionService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.jwt.JWT_SECRET_KEY,
      passReqToCallback: true,
    });
  }

  authenticate(req, options) {
    if (req.handshake) {
      req.headers = req.headers || {};
      req.headers.authorization = `Bearer ${req.handshake?.query?.token}`;
    }

    super.authenticate(req, options);
  }

  async validate(req: Request, payload: any): Promise<any> {
    const { uid, cacheId } = payload;
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const user = await this.sessionService.validateSession({
      userId: uid,
      cacheId,
      token: accessToken,
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return { ...user, cacheId };
  }
}
