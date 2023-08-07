import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cookie from 'js-cookie';

import { httpService, notify, validate } from '@/services';
import { ISignInApiResponse } from '@/types/auth';
import { constants } from '@/utils';

function SignInPage() {

    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email')!.toString();
        const password = formData.get('password')!.toString();

        try {
            validate.signIn({ email, password });
        } catch (error) {
            notify.error((error as { message: string }).message)
            return;
        }

        try {
            const response = await httpService.post<ISignInApiResponse>(constants.API_SIGNIN, { email, password });
            Cookie.set('__USER_TOKEN__', response.token);
            Cookie.set('__USER_ID__', response.user.id);
            router.push('/');
        } catch (error) {
            notify.error((error as { message: string }).message);
        }
    }

    return (
        <main className="container max-w-xs m-auto mt-14">
            <section className="border-2 p-5 rounded-lg">
                <h1 className="text-2xl font-bold text-center">Sign In</h1>
                <form className="mt-10 flex flex-col gap-4 text-sm" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        className="border-2 text-gray-900 rounded-lg focus:border-fuchsia-300 block w-full p-2.5 outline-none"
                        placeholder="Your email"
                    />

                    <input
                        type="password"
                        name="password"
                        className="border-2 text-gray-900 rounded-lg focus:border-fuchsia-300 block w-full p-2.5 outline-none"
                        placeholder="Your password"
                    />

                    <button className="flex items-center gap-4 mt-5 border-2 border-transparent bg-violet-700 px-6 py-2 text-white font-semibold rounded-lg self-end focus:border-violet-800" type="submit">
                        Sign In
                    </button>
                </form>

                <div className="mt-3 text-gray-900 text-sm">
                    <span> {"Don't you have an account? "}
                        <Link href={'/auth/signup'} className="font-bold ml-3 hover:underline text-violet-700">Sign Up</Link>
                    </span>
                </div>
            </section>
        </main>
    )
}

export default SignInPage;