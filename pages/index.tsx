import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { AppLayout } from '@/layout';
import { IPlatform } from '@/types/platform';
import { httpService } from '@/services';
import { constants } from '@/utils';
import { IContest } from '@/types/contest';
import { Contest } from '@/components';

interface Props {
  platforms: IPlatform[];
  contests: IContest[]
}

function HomePage({ platforms, contests }: Props) {
  return (
    <AppLayout>
      <section className='w-full'>
        <h2 className='font-bold text-2xl text-center mb-5 text-slate-900 dark:text-slate-300'>UpComming Contests</h2>
        <div className='flex flex-col gap-1'>
          {
            contests.map(contest => (
              <Contest key={contest.id} contest={contest} />
            ))
          }
        </div>
        <Link
          href='/contests'
          className='block text-center font-semibold dark:text-slate-300 hover:dark:text-slate-200 hover:dark:bg-slate-600/70 p-4 mt-3 rounded-md border border-slate-500 dark:bg-slate-600/60'
        >
          See all contests
        </Link>
      </section>
      <section className='w-full mt-10'>
        <h2 className='font-bold text-2xl text-center mb-5 text-slate-900 dark:text-slate-300'>Online Judges</h2>
        <div className='flex flex-col gap-2 my-2'>
          {
            platforms.map(platform => (
              <Link
                key={platform.id}
                href={`platform/${platform.name.toLowerCase()}`}
                className='w-full p-3 border border-slate-400 font-semibold rounded-md text-center cursor-pointer transition-transform hover:scale-105'
              >
                {platform.name}
              </Link>
            ))
          }
        </div>
      </section>
    </AppLayout>
  )
}

export default HomePage;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const platforms = await httpService.get<IPlatform[]>(constants.API_PLATFORM);
  // TODO: ADD pagination
  const contests = await httpService.get<IContest[]>('/api/contest');

  return {
    props: { platforms, contests: contests.splice(0, 3) }
  }
}

