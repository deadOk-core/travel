import {z} from 'zod'

export const RegisterSchema = z.object({
    token: z.string()
})

export const RegisterSchemaError = z.object({

    
    messages: z.object({
email: z.array(z.string()),
    password: z.array(z.string()),
    })
})

export type TRegister = z.infer<typeof RegisterSchema>
export type TRegisterError = z.infer<typeof RegisterSchemaError>
