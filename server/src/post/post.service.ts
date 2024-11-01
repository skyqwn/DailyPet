import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserInsertType } from 'src/drizzle/schema/users.schema';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { eq } from 'drizzle-orm';
import { posts } from 'src/drizzle/schema/posts.schema';

@Injectable()
export class PostService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}
  async getAllMarkers(user: UserInsertType) {
    try {
      const markers = await this.db
        .select({
          id: posts.id,
          latitude: posts.latitude,
          longitude: posts.longitude,
          color: posts.color,
          score: posts.score,
        })
        .from(posts)
        .where(eq(posts.userId, user.id))
        .execute();

      return markers;
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
