import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { UserManagementService } from './user-management.service';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';
import { AuthResponse, UserProfile } from '../interfaces/auth.interfaces';

@Injectable()
export class AuthenticationService {
  constructor(
    private userManagement: UserManagementService,
    private passwordService: PasswordService,
    private tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { username, password } = loginDto;
    
    const user = await this.userManagement.findUserByUsername(username);

    if (!user || !this.passwordService.verifyPassword(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.password.includes(':')) {
      const hashedPassword = this.passwordService.hashPassword(password);
      await this.userManagement.updateUserPassword(user.id, hashedPassword);
    }

    return this.tokenService.generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const userExists = await this.userManagement.checkUserExists(
      registerDto.username, 
      registerDto.email
    );
    
    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = this.passwordService.hashPassword(registerDto.password);
    
    const newUser = await this.userManagement.createUser(registerDto, hashedPassword);

    return this.tokenService.generateToken(newUser);
  }

  async validateToken(userId: string): Promise<UserProfile | null> {
    return this.userManagement.findUserById(userId);
  }
}
