import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.seedDemoUsers();
  }

  // Seed demo users if they don't exist
  private async seedDemoUsers() {
    try {
      const demoUser = await this.prisma.user.findUnique({
        where: { username: 'demo' },
      });

      if (!demoUser) {
        await this.prisma.user.create({
          data: {
            username: 'demo',
            email: 'demo@instagram-agent.com',
            password: 'demo123', // In production, this should be hashed
            role: 'USER',
          },
        });
      }

      const adminUser = await this.prisma.user.findUnique({
        where: { username: 'admin' },
      });

      if (!adminUser) {
        await this.prisma.user.create({
          data: {
            username: 'admin',
            email: 'admin@instagram-agent.com',
            password: 'admin123', // In production, this should be hashed
            role: 'ADMIN',
          },
        });
      }

      // Create content creator demo user
      const creatorUser = await this.prisma.user.findUnique({
        where: { username: 'creator' },
      });

      if (!creatorUser) {
        await this.prisma.user.create({
          data: {
            username: 'creator',
            email: 'creator@instagram-agent.com',
            password: 'creator123', // In production, this should be hashed
            role: 'USER',
          },
        });
      }
    } catch (error) {
      console.log('Demo users seeding will happen after database is ready');
    }
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    
    // Find user in database
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
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

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username: registerDto.username },
          { email: registerDto.email },
        ],
      },
    });
    
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const newUser = await this.prisma.user.create({
      data: {
        username: registerDto.username,
        email: registerDto.email,
        password: registerDto.password, // In production, this should be hashed
        role: 'USER', // Default role for new users
      },
    });

    const payload = { 
      username: newUser.username, 
      sub: newUser.id, 
      email: newUser.email,
      role: newUser.role 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }

  async validateToken(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (user) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
    }
    return null;
  }

  async getDemoAccounts() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
    return users;
  }
}
