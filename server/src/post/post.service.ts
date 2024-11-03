import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserInsertType } from 'src/drizzle/schema/users.schema';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { and, eq } from 'drizzle-orm';
import { posts } from 'src/drizzle/schema/posts.schema';
import { images } from 'src/drizzle/schema/images.schema';
import { favorite } from 'src/drizzle/schema/favorite.schema';

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
        const newImages = await Promise.all(
          imageUris.map((image) =>
            tx
              .insert(images)
              .values({
                uri: image.uri,
                postId: post[0].id,
              })
              .returning(),
          ),
        );

        return {
          ...post[0],
          images: newImages.map((image) => image[0]),
        };
      });

      return newPost;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '장소를 추가하는 도중 에러가 발생했습니다.',
      );
    }
  }

  async getPostById(id: number, user: UserInsertType) {
    try {
      const result = await this.db
        .select({
          post: posts,
          images: images,
          favorite,
        })
        .from(posts)
        .leftJoin(images, eq(images.postId, posts.id))
        .leftJoin(
          favorite,
          and(eq(favorite.postId, posts.id), eq(favorite.userId, user.id)),
        )
        .where(and(eq(posts.userId, user.id), eq(posts.id, id)))
        .execute();

      if (!result.length) {
        throw new NotFoundException('존재하지 않는 피드입니다.');
      }

      // 좋아요 갯수와 isFavorite 포함해서 반환
      const post = result[0].post;
      const postImages = result.map((r) => r.images).filter(Boolean);
      const isFavorite = result.some((r) => r.favorite !== null);

      return {
        ...post,
        images: postImages,
        isFavorite,
      };
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
