import { GetServerSideProps } from 'next'

import { httpService } from '@/services';
import { IContest } from '@/types/contest';
import { AppLayout } from '@/layout';
import { EditOutlineIcon, LinkOutlineIcon, RemoveOutlineIcon } from '@/components/Icons';
import Link from 'next/link';


interface Props {
    contest: IContest;
}

function ContestInfoPage({ contest }: Props) {

    const { name, platform, link } = contest;
    const { name: platformName } = platform;

    return (
        <AppLayout>
            <div className='w-full'>
                {/* <header className='dark:bg-slate-600 p-5 pb-10 rounded-t-lg rounded-b-[4rem] text-center'> */}
                <header className='p-5 rounded-t-lg rounded-b-[4rem] text-center dark:bg-gradient-to-t dark:from-slate-700'>
                    <h1 className='text-2xl font-bold dark:text-slate-200'>{name}</h1>
                    <h2 className='text-xl font-semibold mt-3 dark:text-slate-400'>{platformName}</h2>

                    <section className='relative mt-6 text-slate-300'>
                        <span className='absolute font-semibold block w-full text-center top-3'>2 hours</span>
                        <div className='flex items-center justify-between relative'>
                            <div className='px-2 py-4 rounded-full bg-sky-700'>
                                <span className='font-semibold'>14:00</span>
                            </div>
                            <div className='absolute -bottom-1 w-full h-[100px] border-[15px] rounded-b-[35%] border-transparent border-b-sky-700'></div>
                            <div className='px-2 py-4 rounded-full bg-sky-700'>
                                <span className='font-semibold'>16:00</span>
                            </div>
                        </div>
                        <span className='block w-full text-center mt-3'>Thusday, 14/6/9</span>
                        <div className='mt-7 p-3 flex gap-1 justify-center items-center text-slate-200 font-semibold bottom-1 hover:underline hover:text-sky-500 transition-colors'>
                            <LinkOutlineIcon className='w-4 h-4' />
                            <Link href={link} target='_blank' referrerPolicy='no-referrer'>See Contest</Link>
                        </div>
                    </section>
                </header>
                <main className='mt-5 w-[90%] m-auto mb-10'>
                    <h1 className='uppercase text-center font-bold text-xl underline'>Alarms</h1>
                    <section className='flex flex-col items-center mt-3 gap-3'>


                        <div className='flex justify-between w-full px-4 py-3 bg-slate-800 rounded-xl transition-transform hover:scale-103'>
                            <div>
                                <span>Thusday 15/6/7: 13:15</span>
                            </div>
                            <div className='flex gap-3'>
                                <EditOutlineIcon className='text-green-600 w-6 h-6 cursor-pointer' />
                                <RemoveOutlineIcon className='text-red-600 w-6 h-6 cursor-pointer' />
                            </div>
                        </div>

                        <div className='flex justify-between w-full px-4 py-3 bg-slate-800 rounded-xl transition-transform hover:scale-103'>
                            <div>
                                <span>Thusday 15/6/7: 13:15</span>
                            </div>
                            <div className='flex gap-3'>
                                <EditOutlineIcon className='text-green-600 w-6 h-6 cursor-pointer' />
                                <RemoveOutlineIcon className='text-red-600 w-6 h-6 cursor-pointer' />
                            </div>
                        </div>

                        <div className='flex justify-between w-full px-4 py-3 bg-slate-800 rounded-xl transition-transform hover:scale-103'>
                            <div>
                                <span>Thusday 15/6/7: 13:15</span>
                            </div>
                            <div className='flex gap-3'>
                                <EditOutlineIcon className='text-green-600 w-6 h-6 cursor-pointer' />
                                <RemoveOutlineIcon className='text-red-600 w-6 h-6 cursor-pointer' />
                            </div>
                        </div>

                        <div className='flex justify-between w-full px-4 py-3 bg-slate-800 rounded-xl transition-transform hover:scale-103'>
                            <div>
                                <span>Thusday 15/6/7: 13:15</span>
                            </div>
                            <div className='flex gap-3'>
                                <EditOutlineIcon className='text-green-600 w-6 h-6 cursor-pointer' />
                                <RemoveOutlineIcon className='text-red-600 w-6 h-6 cursor-pointer' />
                            </div>
                        </div>


                        <button className='w-full py-3 mt-3 bg-slate-700 rounded-lg hover:bg-slate-700/80 transition-colors'>Add Alarm</button>
                    </section>
                </main>
            </div>
        </AppLayout>
    )
}



export default ContestInfoPage;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { contestId } = ctx.params as { contestId: string };

    try {
        const contest = await httpService.get<IContest[]>(`/api/contest/${contestId}`);
        return {
            props: { contest }
        }

    } catch (error) {
        console.log(error);
        return {
            notFound: true,
            redirect: '/contests'
        }
    }
}