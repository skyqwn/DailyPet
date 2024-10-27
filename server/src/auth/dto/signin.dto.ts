import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class SigninDto extends createZodDto(SigninSchema) {}
