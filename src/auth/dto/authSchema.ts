import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export class AuthDto extends createZodDto(CreateUserSchema) {}

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
