import { z } from 'zod'

export const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const defaultValues = {
    email: '',
    password: '',
}

export type FormFields = z.infer<typeof schema>