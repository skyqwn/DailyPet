import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UserInsertType } from 'src/drizzle/schema/users.schema';

@Controller('post')
@UseGuards(AuthGuard())
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('markers/my')
  getAllMarkers(@GetUser() user: UserInsertType) {
    return this.postService.getAllMarkers(user);
  }

  @Post('/')
  createPost(@Body() body: CreatePostDto, @GetUser() user: UserInsertType) {
    return this.postService.createPost(body, user);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
