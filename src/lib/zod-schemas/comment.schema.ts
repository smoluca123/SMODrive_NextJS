import { requiredString } from '@/lib/zod-schemas/schema';
import { z } from 'zod';

export const commentSchema = z.object({
  content: requiredString('Content'),
});
export type CommentValues = z.infer<typeof commentSchema>;
