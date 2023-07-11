import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Auth, AuthUser } from '@app/core';
import { User } from 'src/modules/user/schema/user.schema';
import { LoginRequestDto } from 'src/modules/auth/dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description: `<b ạdjkqwjdkqwdjkw>Example:</b><br>
    <code>
      qdqwd
    </code>
    `,
  })
  login(@Body() input: LoginRequestDto) {
    return this.authService.login(input);
  }

  @Post('register')
  register(@Body() input: RegisterDto) {
    return this.authService.register(input);
  }

  @Get('refresh-token')
  refreshToken(@Headers('refresh') token: string) {
    return this.authService.refreshToken(token);
  }

  @Get('logout')
  @Auth()
  logout(@AuthUser() user: User) {
    return this.authService.logout(user);
  }

  @Get('logout-all')
  @Auth()
  logoutAll(@AuthUser() user: User) {
    return this.authService.logoutAll(user);
  }
}
