import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthenticationService } from './services/authentication.service';
import { UserManagementService } from './services/user-management.service';
import { UserSeedingService } from './services/user-seeding.service';
import { AuthResponse, UserProfile } from './interfaces/auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private authenticationService: AuthenticationService,
    private userManagementService: UserManagementService,
    private userSeedingService: UserSeedingService,
  ) {
    this.userSeedingService.seedDemoUsers();
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    return this.authenticationService.login(loginDto);
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    return this.authenticationService.register(registerDto);
  }

  async validateToken(userId: string): Promise<UserProfile | null> {
    return this.authenticationService.validateToken(userId);
  }

  async getDemoAccounts(): Promise<UserProfile[]> {
    return this.userManagementService.getAllUsers();
  }
}
