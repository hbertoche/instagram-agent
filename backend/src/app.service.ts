import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiInfo() {
    return {
      name: 'Instagram Agent API',
      description: 'AI-Powered Content Generation with A/B Testing',
      version: '1.0.0',
      endpoints: {
        content: {
          generate: 'POST /generate',
          select: 'POST /select',
          history: 'GET /history',
          analytics: 'GET /analytics',
        },
        auth: {
          login: 'POST /auth/login',
          register: 'POST /auth/register',
          profile: 'GET /auth/profile',
          demoAccounts: 'GET /auth/demo-accounts',
        },
      },
    };
  }
}
