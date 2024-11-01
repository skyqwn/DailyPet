import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { UseZodGuard, ZodValidationPipe } from 'nestjs-zod';
import { SigninDto } from './dto/signin.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UserInsertType } from 'src/drizzle/schema/users.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  login(@Body() signinDto: SigninDto) {
    return this.authService.login(signinDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard())
  logout(@GetUser() user: UserInsertType) {
    return this.authService.deleteRefreshToken(user);
  }

  @Get('refresh')
  @UseGuards(AuthGuard())
  refresh(@GetUser() user: UserInsertType) {
    return this.authService.refreshToken(user);
  }

  @Get('me')
  @UseGuards(AuthGuard())
  getProfile(@GetUser() user: UserInsertType) {
    return this.authService.getProfile(user);
  }
}
