import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload, AuthResponse, UserProfile } from '../interfaces/auth.interfaces';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: UserProfile): AuthResponse {
    const payload: UserPayload = { 
      username: user.username, 
      sub: user.id, 
      email: user.email,
      role: user.role 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }

  verifyToken(token: string): UserPayload | null {
    try {
      const decoded = this.jwtService.verify(token) as UserPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
