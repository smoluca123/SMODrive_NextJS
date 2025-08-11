import { requiredString } from '@/lib/zod-schemas/schema';
import { z } from 'zod';

export const uploadFileSchema = z.object({
  description: requiredString('Description'),
  tags: z.array(z.object({ id: z.string(), text: z.string() })),
  isPublic: z.boolean(),
  agreeTerms: z.boolean(),
});

export type UploadFileSchema = z.infer<typeof uploadFileSchema>;
