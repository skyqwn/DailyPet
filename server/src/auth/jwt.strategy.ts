import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { eq } from 'drizzle-orm';

import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { users } from 'src/drizzle/schema/users.schema';
import { DrizzleDB } from 'src/drizzle/types/drizzle';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: { email: string }) {
    const { email } = payload;
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      throw new UnauthorizedException('유저가 존재하지 않습니다.');
    }

    return user;
  }
}
