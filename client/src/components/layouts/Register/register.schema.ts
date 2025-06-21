import { z } from 'zod'

export const schema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
})

export const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}

export type FormFields = z.infer<typeof schema>