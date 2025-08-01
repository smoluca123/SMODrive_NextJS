import { z } from 'zod';

export const requiredString = (field: string) => z.string().trim().min(1, `${field} is required`);
