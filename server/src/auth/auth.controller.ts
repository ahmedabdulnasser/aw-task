import { Controller, Post, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  async login() {
    // Simple login - just return success (no actual authentication required)
    return {
      message: 'Login successful',
      isAuthenticated: true,
      token: 'simple-token',
    };
  }

  @Post('logout')
  async logout() {
    return { message: 'Logout successful', isAuthenticated: false };
  }

  @Get('status')
  async getAuthStatus() {
    // For this simple demo, always return authenticated
    // In a real app, you'd check a token or session
    return { isAuthenticated: true };
  }
}
