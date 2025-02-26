import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(500, { message: 'Title must be at most 500 characters' }),
  completed: z.boolean().optional(),
});
export class CreateTaskDto extends createZodDto(CreateTaskSchema) {}

export type CreateTaskSchemaType = z.infer<typeof CreateTaskSchema>;

export const UpdateTaskSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  completed: z.boolean().optional(),
});
export type UpdateTaskSchemaType = z.infer<typeof UpdateTaskSchema>;
export class UpdateTaskDto extends createZodDto(UpdateTaskSchema) {}
