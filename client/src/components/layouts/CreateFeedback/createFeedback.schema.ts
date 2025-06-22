import { z } from 'zod';

export const schema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    content: z.string().min(3),
    category: z.enum(['bug', 'feature']),
    status: z.enum(['pending', 'resolved', 'closed'])
});

export const defaultValues: z.infer<typeof schema> = {
    name: '',
    email: '',
    content: '',
    category: 'bug',
    status: 'pending'
};

export type FormFields = z.infer<typeof schema>;