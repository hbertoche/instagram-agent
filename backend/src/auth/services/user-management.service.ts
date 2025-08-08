import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from '../dto/auth.dto';
import { UserProfile } from '../interfaces/auth.interfaces';

@Injectable()
export class UserManagementService {
  constructor(private prisma: PrismaService) {}

  async findUserByUsername(username: string): Promise<{ id: string; username: string; email: string; password: string; role: string } | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findUserById(userId: string): Promise<UserProfile | null> {
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

  async createUser(registerDto: RegisterDto, hashedPassword: string): Promise<UserProfile> {
    const newUser = await this.prisma.user.create({
      data: {
        username: registerDto.username,
        email: registerDto.email,
        password: hashedPassword,
        role: 'USER',
      },
    });

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    };
  }

  async checkUserExists(username: string, email: string): Promise<boolean> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email },
        ],
      },
    });
    
    return !!existingUser;
  }

  async updateUserPassword(userId: string, hashedPassword: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  async getAllUsers(): Promise<UserProfile[]> {
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
