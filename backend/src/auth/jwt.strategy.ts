import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import type { UserProfile } from './interfaces/auth.interfaces';

interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'instagram-agent-secret-key',
    });
  }

  async validate(payload: JwtPayload): Promise<UserProfile> {
    const user = await this.authService.validateToken(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { 
      id: payload.sub, 
      username: payload.username, 
      email: payload.email, 
      role: payload.role 
    };
  }
}
