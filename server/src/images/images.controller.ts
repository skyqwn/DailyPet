import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { getUniqueFileName } from 'src/common/decorators/util';
import { ResizeImagePipe } from './pipes/resize-image.pipe';

@Controller('images')
@UseGuards(AuthGuard())
export class ImagesController {
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      limits: { fileSize: 20 * 1024 * 1024 },
    }),
  )
  async uploadImages(
    @UploadedFiles(ResizeImagePipe) files: Express.Multer.File[],
  ) {
    console.log('files: ', files);

    const s3Client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KET_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });

    const uuid = Date.now();

    const uploadPromise = files.map((file) => {
      const fileName = getUniqueFileName(file, uuid);
      const uploadParams = {
        Body: file.buffer,
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `original/${fileName}`,
      };
      const command = new PutObjectCommand(uploadParams);

      return s3Client.send(command);
    });

    await Promise.all(uploadPromise);

    const uris = files.map((file) => {
      const fileName = getUniqueFileName(file, uuid);

      return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/original/${fileName}`;
    });

    return uris;
  }
}
