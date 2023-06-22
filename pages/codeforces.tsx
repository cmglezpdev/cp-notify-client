import { GetServerSideProps, NextPage } from 'next'

import { ICodeforcesContest, IContest } from '@/interface'
import { Contest, CodeforcesHeader } from '@/components';
import { baseApi } from '@/api';
import { AppLayout } from '@/layout';

interface Props {
  contests: IContest[];
}

const Codeforces : NextPage<Props> = ({ contests }) => {
  return (
    <AppLayout>
        <CodeforcesHeader />
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

export default Codeforces;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const response : Response = await fetch('http://localhost:3000/api/codeforces', { method: 'GET' }); 
  const { data } = await baseApi.get<{ contests: ICodeforcesContest[] }>('/codeforces');
  const { contests } = data;
  contests.sort((contestA, contestB) => contestA.startTimeSeconds - contestB.startTimeSeconds);

  const codeforcesContest : IContest[] = contests.map(contest => ({
    id: contest.id,
    name: contest.name,
    type: contest.type,
    platform: 'CODEFORCES',
    durationSeconds: contest.durationSeconds,
    startTimeSeconds: contest.startTimeSeconds * 1000,
    link: `https://codeforces.com/contests/${contest.id}`,
  }))
  
  return {
    props: { contests: codeforcesContest }
  }
}