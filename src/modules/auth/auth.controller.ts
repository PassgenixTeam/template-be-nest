import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
  login(@Body() input: LoginDto) {
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
  logout() {
    return this.authService.logout();
  }
}
