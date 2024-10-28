import {z} from 'zod';

export const LoginSchema = z.object({
  email: z
    .string({message: '이메일을 입력해주세요.'})
    .email({message: '이메일 형식이 올바르지 않습니다.'}),
  password: z
    .string({message: '비밀번호를 입력해주세요.'})
    .min(8, {message: '비밀번호는 최소 8자 이상이어야 합니다.'}),
});

export type zLoginSchema = z.infer<typeof LoginSchema>;
