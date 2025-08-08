import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { PasswordService } from './password.service';

@Injectable()
export class UserSeedingService {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async seedDemoUsers(): Promise<void> {
    try {
      await this.createDemoUser();
      await this.createAdminUser();
      await this.createCreatorUser();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Demo users seeding will happen after database is ready');
      }
    }
  }

  private async createDemoUser(): Promise<void> {
    const username = this.configService.get<string>('DEMO_USER_USERNAME') || 'demo';
    const demoUser = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!demoUser) {
      const password = this.configService.get<string>('DEMO_USER_PASSWORD') || 'demo123';
      const hashedPassword = this.passwordService.hashPassword(password);
      await this.prisma.user.create({
        data: {
          username,
          email: this.configService.get<string>('DEMO_USER_EMAIL') || 'demo@instagram-agent.com',
          password: hashedPassword,
          role: 'USER',
        },
      });
    }
  }

  private async createAdminUser(): Promise<void> {
    const username = this.configService.get<string>('ADMIN_USER_USERNAME') || 'admin';
    const adminUser = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!adminUser) {
      const password = this.configService.get<string>('ADMIN_USER_PASSWORD') || 'admin123';
      const hashedPassword = this.passwordService.hashPassword(password);
      await this.prisma.user.create({
        data: {
          username,
          email: this.configService.get<string>('ADMIN_USER_EMAIL') || 'admin@instagram-agent.com',
          password: hashedPassword,
          role: 'ADMIN',
        },
      });
    }
  }

  private async createCreatorUser(): Promise<void> {
    const username = this.configService.get<string>('CREATOR_USER_USERNAME') || 'creator';
    const creatorUser = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!creatorUser) {
      const password = this.configService.get<string>('CREATOR_USER_PASSWORD') || 'creator123';
      const hashedPassword = this.passwordService.hashPassword(password);
      await this.prisma.user.create({
        data: {
          username,
          email: this.configService.get<string>('CREATOR_USER_EMAIL') || 'creator@instagram-agent.com',
          password: hashedPassword,
          role: 'USER',
        },
      });
    }
  }
}
