import { describe, it, expect } from 'vitest';
import { createUserSchema } from '../src/models.js';

describe('createUserSchema', () => {
  it('validates a correct user', () => {
    const result = createUserSchema.safeParse({
      name: 'Alice',
      email: 'alice@example.com',
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing name', () => {
    const result = createUserSchema.safeParse({
      email: 'alice@example.com',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = createUserSchema.safeParse({
      name: 'Alice',
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
  });

  it('defaults role to user', () => {
    const result = createUserSchema.safeParse({
      name: 'Bob',
      email: 'bob@example.com',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.role).toBe('user');
    }
  });

  it('accepts valid role', () => {
    const result = createUserSchema.safeParse({
      name: 'Carol',
      email: 'carol@example.com',
      role: 'admin',
    });
    expect(result.success).toBe(true);
  });
});
