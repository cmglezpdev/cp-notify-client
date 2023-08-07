import { httpService, notify, validate } from "@/services";
import { SignUpApiResponse } from "@/types/auth";
import { constants } from "@/utils";
import Link from "next/link";
import { FormEvent } from "react";

function SignUpPage() {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name')!.toString();
        const email = formData.get('email')!.toString();
        const password = formData.get('password')!.toString();
        const repeatPassword = formData.get('repeat-password')!.toString();

        try {
            validate.signUp({ name, email, password, repeatPassword });
            if (password !== repeatPassword) throw new Error('Passwords do not equals')
        } catch (error) {
            notify.error((error as { message: string }).message)
            return;
        }

        try {
            const response = await httpService.post<SignUpApiResponse>(constants.API_SIGNUP, { name, email, password });
            // TODO: aguardar informacion el el store
            console.log(response);
        } catch (error) {
            notify.error((error as { message: string }).message);
        }
    }


    return (
        <main className="container max-w-xs m-auto mt-14">
            <section className="border-4 p-5 rounded-lg">
                <h1 className="text-2xl font-bold text-center">Sign Up</h1>
                <form className="mt-10 flex flex-col gap-4 text-sm" onSubmit={handleSubmit}>
                    <input type="text" name="name" className="border-2 text-gray-900 rounded-lg focus:border-fuchsia-300 block w-full p-2.5 outline-none" placeholder="Input your name" />
                    <input type="text" name="email" className="border-2 text-gray-900 rounded-lg focus:border-fuchsia-300 block w-full p-2.5 outline-none" placeholder="Input your email" />
                    <input type="text" name="password" className="border-2 text-gray-900 rounded-lg focus:border-fuchsia-300 block w-full p-2.5 outline-none" placeholder="Input your password" />
                    <input type="text" name="repeat-password" className="border-2 text-gray-900 rounded-lg focus:border-fuchsia-300 block w-full p-2.5 outline-none" placeholder="Confirm Password" />
                    <button className="mt-5 border-2 border-transparent bg-violet-700 px-6 py-2 text-white font-semibold rounded-lg self-end focus:border-violet-800" type="submit">
                        Sign Up
                    </button>
                </form>

                <div className="mt-7 text-gray-900 text-sm">
                    <span> {"You already have an account? "}
                        <Link href={'/auth/signin'} className="font-bold ml-3 hover:underline text-violet-700">Sign In</Link>
                    </span>
                </div>
            </section>
        </main>
    )
}


export default SignUpPage;