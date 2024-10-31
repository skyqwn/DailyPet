import {z} from 'zod';

export const SignupSchema = z
  .object({
    email: z
      .string({message: '이메일을 입력해주세요.'})
      .email({message: '이메일 형식이 올바르지 않습니다.'}),
    password: z
      .string({message: '비밀번호를 입력해주세요.'})
      .min(8, {message: '비밀번호는 최소 8자 이상이어야 합니다.'}),
    passwordConfirm: z
      .string({message: '비밀번호 확인을 입력해주세요.'})
      .min(8, {message: '비밀번호는 최소 8자 이상이어야 합니다.'}),
    nickname: z
      .string({message: '닉네임을 입력해주세요.'})
      .min(2, {message: '최소 2글자는 입력해주세요.'})
      .max(10, {message: '최대 10글자까지 입력할 수 있습니다.'}),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type zSignupSchema = z.infer<typeof SignupSchema>;
