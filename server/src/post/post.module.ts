import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AuthModule } from 'src/auth/auth.module';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  imports: [AuthModule, DrizzleModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
