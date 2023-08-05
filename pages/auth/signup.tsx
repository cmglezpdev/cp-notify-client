import Link from "next/link";

function SignUpPage() {
    return (
        <main className="container max-w-xs m-auto mt-14">
            <section className="border-4 p-5 rounded-lg">
                <h1 className="text-2xl font-bold text-center">Sign Up</h1>
                <form className="mt-10 flex flex-col gap-4 text-sm">
                    <input type="text" name="name" className="border-2 text-gray-900 rounded-lg focus:border-fuchsia-300 block w-full p-2.5 outline-none" placeholder="Input your name" />
                    <input type="text" name="email" className="border-2 text-gray-900 rounded-lg focus:border-fuchsia-300 block w-full p-2.5 outline-none" placeholder="Input your email" />
                    <input type="text" name="password" className="border-2 text-gray-900 rounded-lg focus:border-fuchsia-300 block w-full p-2.5 outline-none" placeholder="Input your password" />
                    <input type="text" name="password" className="border-2 text-gray-900 rounded-lg focus:border-fuchsia-300 block w-full p-2.5 outline-none" placeholder="Confirm Password" />
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