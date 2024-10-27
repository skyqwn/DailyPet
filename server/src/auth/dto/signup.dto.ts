import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const SignupSchema = z.object({
  nickname: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
});

export class SignupDto extends createZodDto(SignupSchema) {}
