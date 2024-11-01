import {z} from 'zod';

export const AddPostSchema = z.object({
  title: z
    .string({message: '제목을 입력해주세요.'})
    .min(1, {message: '최소 1자는 입력해주세요'})
    .max(20, {message: '최대 20자까지 입력가능합니다.'}),
  description: z
    .string({message: '내용을 입력해주세요.'})
    .min(10, {message: '내용은 최소 10자 이상이어야 합니다.'})
    .max(300, {message: '최대 300자까지 입력가능합니다.'}),
});

export type zAddPostSchema = z.infer<typeof AddPostSchema>;
