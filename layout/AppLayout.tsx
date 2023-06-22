import Head from "next/head"
import { FC } from "react"

interface Props {
    children: React.ReactNode
}

export const AppLayout: FC<Props> = ({ children }) => {
    return (
        <>
            <Head>
                <title>CP Notify</title>
                <meta name="description" content="Notify about Competitive Programming Contests" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='w-[300px] bg-blue-200 p-2 min-h-screen'>
                { children }
            </main>
        </>
    )
}
