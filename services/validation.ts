import { ISignInApiRequest, SignUpApiRequest } from '@/types/auth';
import z, { ZodError } from 'zod';


const signInCredentials = z.object({
    email: z.string({
        required_error: 'Email is required'
    }).email('Must be an email'),

    password: z.string({
        required_error: 'Password is required'
    }).regex(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, "The password must have an uppercase, lowercase letter and a number")
})

const signUpCredentials = signInCredentials.extend({
    name: z.string({
        required_error: 'Name is required'
    }).min(2, 'Name must have [2-30] characters').max(30, 'Name must have [2-30] characters'),

    repeatPassword: z.string({
        required_error: 'Password is required'
    }).regex(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, "The password must have an uppercase, lowercase letter and a number")
})



export const validate = {
    signIn: (credentials: ISignInApiRequest) => {
        try {
            signInCredentials.parse(credentials);
        } catch (errors) {
            const messages = (errors as ZodError).errors.map(error => error.message);
            throw new Error(messages[0]);
        }
    },

    signUp: (data: SignUpApiRequest) => {
        try {
            signUpCredentials.parse(data);
        } catch (errors) {
            const messages = (errors as ZodError).errors.map(error => error.message);
            throw new Error(messages[0]);
        }
    }
}