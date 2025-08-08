import { Injectable } from '@nestjs/common';

export interface AuthUser {
  id: string;
  role: string;
}

@Injectable()
export class AuthorizationService {
  canViewAllContent(user: AuthUser): boolean {
    return user.role === 'ADMIN';
  }

  buildContentFilter(user: AuthUser): { userId?: string } {
    return this.canViewAllContent(user) ? {} : { userId: user.id };
  }

  shouldIncludeUserInfo(user: AuthUser): boolean {
    return this.canViewAllContent(user);
  }
}
