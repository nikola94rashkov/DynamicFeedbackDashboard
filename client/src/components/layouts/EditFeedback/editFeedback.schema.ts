import { z } from 'zod';

export const schema = z.object({
    content: z.string().min(3),
    status: z.enum(['pending', 'resolved', 'closed'])
});

export type FormFields = z.infer<typeof schema>;