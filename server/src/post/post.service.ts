import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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

  async createPost(
    {
      address,
      color,
      date,
      description,
      imageUris,
      latitude,
      longitude,
      score,
      title,
    }: CreatePostDto,
    user: UserInsertType,
  ) {
    try {
      const newPost = await this.db.transaction(async (tx) => {
        const post = await tx
          .insert(posts)
          .values({
            address,
            description,
            latitude,
            longitude,
            score,
            date: new Date(date),
            title,
            color,
            userId: user.id,
          })
          .returning();
        console.log(post);
        // 이미지 추가
        // const newImages = await Promise.all(
        //   imageUris.map((image) =>
        //     tx
        //       .insert(images)
        //       .values({
        //         uri: image.uri,
        //         postId: post[0].id,
        //       })
        //       .returning(),
        //   ),
        // );

        return {
          ...post[0],
          // images: newImages.map((image) => image[0]),
        };
      });

      return newPost;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '장소를 추가하는 도중 에러가 발생했습니다.',
      );
    }

    // try {
    //   const newPost = await this.db
    //     .insert(posts)
    //     .values({
    //       address,
    //       description,
    //       latitude,
    //       longitude,
    //       score,
    //       title,
    //       color,
    //       userId: user.id,
    //     })
    //     .returning();

    //   const newImages = await Promise.all(
    //     imageUris.map((image) =>
    //       this.db
    //         .insert(images)
    //         .values({
    //           uri: image.uri,
    //           postId: newPost[0].id,
    //         })
    //         .returning(),
    //     ),
    //   );

    //   return {
    //     ...newPost[0],
    //     images: newImages.map((image) => image[0]),
    //   };
    // } catch (error) {
    //   console.log(error);
    // }
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
