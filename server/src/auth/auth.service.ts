import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { ConfigService } from '@nestjs/config';
import { SignupDto } from './dto/signup.dto';
import { users } from 'src/drizzle/schema/users.schema';
import { eq } from 'drizzle-orm';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private readonly configService: ConfigService,
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

      await this.db
        .insert(users)
        .values({
          email,
          nickname,
          password,
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

  signin(signinDto: SigninDto) {
    const { email, password } = signinDto;
  }
}
