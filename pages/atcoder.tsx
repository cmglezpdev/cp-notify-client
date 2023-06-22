import { GetServerSideProps, NextPage } from 'next'

import { IContest } from '@/interface'
import { Contest, AtCoderHeader } from '@/components';
import { scrapAtCoder } from '@/Scrappers';
import { AppLayout } from '@/layout';

interface Props {
  contests: IContest[];
}

const AtCoder : NextPage<Props> = ({ contests }) => {
  return (
    <AppLayout>
        <AtCoderHeader />
        <div className='w-full pt-2'>
          {
            contests.map(contest => (
              <Contest contest={contest} key={contest.id}/>
            ))
          }
        </div>
    </AppLayout>
  )
}

export default AtCoder;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const contests = await scrapAtCoder();

  return {
    props: { contests }
  }
}