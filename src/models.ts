import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'viewer']).default('user'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export interface User extends CreateUserInput {
  id: number;
  createdAt: Date;
}
