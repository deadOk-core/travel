import { z} from 'zod'

export const RegisterSchema = z.object({
    token: z.string()
})

const RegisterSchemaError = z.object({
    messages: z.object({
        email: z.array(z.string())
    })
})

export const LogoutSchema = z.object({
    message: z.string()
})

export type TRegister = z.infer<typeof RegisterSchema>
export type TRegisterError = z.infer<typeof RegisterSchemaError>
export type TLogout = z.infer<typeof LogoutSchema>
