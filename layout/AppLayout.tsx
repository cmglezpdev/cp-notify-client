import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/store'
import { HomeOutlineIcon, HomeSolidIcon, NotificationOutlineIcon, NotificationSolidIcon, SettingsOutlineIcon, SettingsSolidIcon, UserOutlineIcon } from '@/components/Icons'

interface Props {
    children: React.ReactNode
}

export function AppLayout({ children }: Props) {
    const user = useAuthStore(store => store.user);
    const { pathname } = useRouter();

    return (
        <>
            <Head>
                <title>CP Notify</title>
                <meta name='description' content='Notify about Competitive Programming Contests' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
                <link rel='apple-touch-icon' href='/favicon.ico'></link>
                <meta name='theme-color' content='#fff' />
            </Head>
            <div className='w-full max-w-sm m-auto min-h-screen max-h-screen flex flex-col py-3 pb-0 bg-white text-slate-500 dark:text-slate-400 dark:bg-gradient-to-bl dark:from-slate-900 dark:via-cyan-900 dark:to-slate-900 dark:from-5% dark:via-20% dark:to-35%'>
                <header className='w-full flex justify-between px-4 p-2 h-1/5 items-center'>
                    <p className='text-slate-300'>Hello, <span>{user?.name}</span></p>
                    <UserOutlineIcon className='w-10 h-10' />
                </header>
                <main className='w-full p-2 px-5 overflow-auto flex-1'>
                    {children}
                </main>
                <footer className='w-full flex justify-between p-2 px-8 h-1/5'>
                    <Link href='/' className={pathname === '/' ? 'text-sky-500' : ''}>
                        {pathname === '/' ? <HomeSolidIcon /> : <HomeOutlineIcon />}
                    </Link>
                    <Link href='/contests' className={pathname === '/contests' ? 'text-sky-500' : ''}>
                        {pathname === '/contests' ? <NotificationSolidIcon /> : <NotificationOutlineIcon />}
                    </Link>
                    <Link href='/settings' className={pathname === '/settigns' ? 'text-sky-500' : ''}>
                        {pathname === '/settings' ? <SettingsSolidIcon /> : <SettingsOutlineIcon />}
                    </Link>
                </footer>
            </div>
        </>
    )
}
