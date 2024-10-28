import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import * as bcrypt from 'bcryptjs';

import { SignupDto } from './dto/signup.dto';
import { UserInsertType, users } from 'src/drizzle/schema/users.schema';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signup({ email, nickname, password, passwordConfirm }: SignupDto) {
    try {
      const existingUser = await this.db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (existingUser.length > 0) {
        throw new ConflictException('이미 존재하는 이메일입니다.');
      }

      if (password !== passwordConfirm) {
        throw new BadRequestException('비밀번호가 일치하지 않습니다.');
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      await this.db
        .insert(users)
        .values({
          email,
          nickname,
          password: hashedPassword,
          loginType: 'email',
        })
        .returning();
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        '회원가입 도중 에러가 발생했습니다.',
      );
    }
  }

  async login(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      throw new UnauthorizedException('유저가 존재하지 않습니다.');
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    const { accessToken, refreshToken } = await this.getTokens({ email });
    await this.updateHashedRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  private async getTokens(payload: { email: string }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  private async updateHashedRefreshToken(id: number, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

    try {
      await this.db
        .update(users)
        .set({
          hashedRefreshToken,
        })
        .where(eq(users.id, id));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async refreshToken(user: UserInsertType) {
    const { email } = user;
    const { accessToken, refreshToken } = await this.getTokens({ email });

    if (!user.hashedRefreshToken) {
      throw new ForbiddenException();
    }

    await this.updateHashedRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  getProfile(user: UserInsertType) {
    const { password, hashedRefreshToken, ...rest } = user;

    return { ...rest };
  }
}
